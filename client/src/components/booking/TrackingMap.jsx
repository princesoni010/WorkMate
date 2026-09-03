import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

// Fix standard marker icon issues in bundled React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Calculate distance in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
};

const TrackingMap = ({
  customerLocation = { lat: 23.3641, lng: 85.3296, label: 'Customer Location (Kanke Road, Ranchi)' },
  workerInitialLocation = { lat: 23.3441, lng: 85.3096, label: 'Ramesh Kumar (Worker)' },
  workerName = 'Ramesh Kumar',
  workerSkill = 'Electrician',
  status = 'on_the_way',
  bookingCode = 'WM-849201'
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);
  const polylineRef = useRef(null);

  const [workerPos, setWorkerPos] = useState([workerInitialLocation.lat, workerInitialLocation.lng]);
  const [distanceKm, setDistanceKm] = useState(
    calculateDistance(workerInitialLocation.lat, workerInitialLocation.lng, customerLocation.lat, customerLocation.lng)
  );
  const [etaMins, setEtaMins] = useState(Math.round(distanceKm * 4) + 3);
  const [isSimulating, setIsSimulating] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [(customerLocation.lat + workerPos[0]) / 2, (customerLocation.lng + workerPos[1]) / 2],
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom Customer Marker (House Icon)
      const customerIcon = L.divIcon({
        className: 'custom-customer-icon',
        html: `
          <div style="background-color: #1E40AF; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 18px;">
            🏠
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      L.marker([customerLocation.lat, customerLocation.lng], { icon: customerIcon })
        .addTo(map)
        .bindPopup(`<b>Your Address</b><br/>${customerLocation.label}`);

      // Custom Worker Marker (Moving Bike / Tool Icon with Pulse)
      const workerIcon = L.divIcon({
        className: 'custom-worker-icon',
        html: `
          <div style="position: relative;">
            <div style="position: absolute; width: 46px; height: 46px; background-color: rgba(255, 153, 51, 0.4); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; top: -4px; left: -4px;"></div>
            <div style="background-color: #FF9933; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 18px; position: relative; z-index: 2;">
              🛵
            </div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const workerMarker = L.marker(workerPos, { icon: workerIcon })
        .addTo(map)
        .bindPopup(`<b>${workerName} (${workerSkill})</b><br/>Status: ${status}`);

      workerMarkerRef.current = workerMarker;

      // Polyline connecting worker and customer
      const polyline = L.polyline([workerPos, [customerLocation.lat, customerLocation.lng]], {
        color: '#138808',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.8,
      }).addTo(map);

      polylineRef.current = polyline;

      // Fit bounds
      const bounds = L.latLngBounds([workerPos, [customerLocation.lat, customerLocation.lng]]);
      map.fitBounds(bounds, { padding: [50, 50] });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Worker movement simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setWorkerPos((prev) => {
        const dLat = customerLocation.lat - prev[0];
        const dLng = customerLocation.lng - prev[1];

        // If very close, stop moving
        if (Math.abs(dLat) < 0.0005 && Math.abs(dLng) < 0.0005) {
          setIsSimulating(false);
          return [customerLocation.lat, customerLocation.lng];
        }

        // Move 3% closer each step
        const nextLat = prev[0] + dLat * 0.03;
        const nextLng = prev[1] + dLng * 0.03;
        const nextDist = calculateDistance(nextLat, nextLng, customerLocation.lat, customerLocation.lng);

        setDistanceKm(nextDist);
        setEtaMins(Math.max(1, Math.round(nextDist * 3.5)));

        // Update Marker & Polyline on map
        if (workerMarkerRef.current) {
          workerMarkerRef.current.setLatLng([nextLat, nextLng]);
        }
        if (polylineRef.current) {
          polylineRef.current.setLatLngs([[nextLat, nextLng], [customerLocation.lat, customerLocation.lng]]);
        }

        return [nextLat, nextLng];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating, customerLocation]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      {/* Map Header with Real-Time ETA */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">Live GPS Tracking</span>
          </div>
          <h3 className="text-lg font-extrabold mt-0.5">{workerName} is on the way</h3>
          <p className="text-xs text-orange-100">Booking #{bookingCode}</p>
        </div>

        <div className="text-right bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl">
          <div className="text-xl font-black">{etaMins} mins</div>
          <div className="text-[11px] font-medium text-orange-100">{distanceKm} km away</div>
        </div>
      </div>

      {/* Leaflet Map DOM Container */}
      <div className="relative">
        <div ref={mapContainerRef} style={{ height: '320px', width: '100%', zIndex: 1 }} />

        {/* Floating Quick Controls on Map */}
        <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setView(workerPos, 16);
              }
            }}
            className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 border border-gray-200 flex items-center space-x-1"
          >
            <span>🛵</span>
            <span>Focus Worker</span>
          </button>
          <button
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setView([customerLocation.lat, customerLocation.lng], 16);
              }
            }}
            className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 border border-gray-200 flex items-center space-x-1"
          >
            <span>🏠</span>
            <span>Focus Home</span>
          </button>
        </div>
      </div>

      {/* Driver Info & Action Bar */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-[#FF9933] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {workerName[0]}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                {workerName}
                <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">Verified</span>
              </h4>
              <p className="text-xs text-gray-500">{workerSkill} • Ranchi Shramik Sahakari Samiti</p>
              <p className="text-xs text-amber-600 font-semibold mt-0.5">★ 4.8 (89 reviews) • Safety Kit Checked ✓</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <a
              href="tel:9876543211"
              className="px-3 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 shadow-sm flex items-center space-x-1"
            >
              <span>📞</span>
              <span>Call</span>
            </a>
            <button
              onClick={() => alert(`Connecting to WorkMate Cooperative SOS Support for Booking ${bookingCode}...`)}
              className="px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-100"
            >
              SOS
            </button>
          </div>
        </div>

        {/* Live Status Stepper */}
        <div className="mt-4 pt-3 border-t border-gray-200 grid grid-cols-4 gap-1 text-center text-[11px]">
          <div className="text-green-700 font-bold">
            <div className="w-5 h-5 mx-auto mb-1 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
            Confirmed
          </div>
          <div className="text-green-700 font-bold">
            <div className="w-5 h-5 mx-auto mb-1 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
            Assigned
          </div>
          <div className="text-orange-600 font-bold">
            <div className="w-5 h-5 mx-auto mb-1 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] animate-bounce">🛵</div>
            On the Way
          </div>
          <div className="text-gray-400">
            <div className="w-5 h-5 mx-auto mb-1 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-[10px]">4</div>
            In Progress
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
