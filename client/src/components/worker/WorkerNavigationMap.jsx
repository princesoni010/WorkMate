import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

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

const WorkerNavigationMap = ({
  job = {
    id: 'WM-849201',
    customer: 'Priya Sharma',
    customerPhone: '9876543210',
    service: 'Electrician - Fan & Switchboard Repair',
    location: 'Flat 402, Shanti Kunj Apartments, Kanke Road, Ranchi',
    lat: 23.3641,
    lng: 85.3296,
    earnings: 540, // 90% of 600
    status: 'on_the_way'
  },
  onStatusChange
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);
  const polylineRef = useRef(null);

  const [workerPos, setWorkerPos] = useState([23.3441, 85.3096]); // Ranchi Central/Main Road
  const [distanceKm, setDistanceKm] = useState(
    calculateDistance(23.3441, 85.3096, job.lat, job.lng)
  );
  const [etaMins, setEtaMins] = useState(Math.round(distanceKm * 3.5) + 2);
  const [currentStatus, setCurrentStatus] = useState(job.status || 'accepted');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [(job.lat + workerPos[0]) / 2, (job.lng + workerPos[1]) / 2],
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      // Customer Location Marker (Red Pin with House)
      const customerIcon = L.divIcon({
        className: 'worker-customer-icon',
        html: `
          <div style="background-color: #DC2626; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 20px;">
            📍
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker([job.lat, job.lng], { icon: customerIcon })
        .addTo(map)
        .bindPopup(`<b>Customer: ${job.customer}</b><br/>${job.location}`);

      // Worker Live Position (Green Marker with You / Bike)
      const workerIcon = L.divIcon({
        className: 'worker-self-icon',
        html: `
          <div style="position: relative;">
            <div style="position: absolute; width: 48px; height: 48px; background-color: rgba(19, 136, 8, 0.4); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; top: -4px; left: -4px;"></div>
            <div style="background-color: #138808; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 20px; position: relative; z-index: 2;">
              🛵
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const workerMarker = L.marker(workerPos, { icon: workerIcon })
        .addTo(map)
        .bindPopup('<b>Your Current GPS Location</b><br/>En route to job site');

      workerMarkerRef.current = workerMarker;

      // Polyline (Navigation route)
      const polyline = L.polyline([workerPos, [job.lat, job.lng]], {
        color: '#2563EB',
        weight: 5,
        opacity: 0.85,
      }).addTo(map);

      polylineRef.current = polyline;

      const bounds = L.latLngBounds([workerPos, [job.lat, job.lng]]);
      map.fitBounds(bounds, { padding: [50, 50] });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [job]);

  const handleStatusUpdate = (nextStatus) => {
    setCurrentStatus(nextStatus);
    if (onStatusChange) {
      onStatusChange(job.id, nextStatus);
    }
  };

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${job.lat},${job.lng}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      {/* Navigation Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Worker GPS Navigation</span>
            </div>
            <h3 className="text-base font-bold mt-1">{job.service}</h3>
            <p className="text-xs text-blue-200">{job.location}</p>
          </div>

          <div className="text-right bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <div className="text-lg font-black text-white">{distanceKm} km</div>
            <div className="text-[11px] text-blue-200">~{etaMins} mins travel</div>
          </div>
        </div>

        {/* Turn Direction Box */}
        <div className="mt-3 bg-white/10 p-2.5 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-lg">⬆️</span>
            <span>Head towards Kanke Road • Straight 1.8 km</span>
          </div>
          <button
            onClick={openGoogleMaps}
            className="bg-white text-blue-900 font-bold px-2.5 py-1 rounded-lg text-xs hover:bg-blue-50 shadow-sm"
          >
            Google Maps ↗
          </button>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="relative">
        <div ref={mapContainerRef} style={{ height: '300px', width: '100%', zIndex: 1 }} />
        
        {/* Focus controls */}
        <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setView(workerPos, 16);
              }
            }}
            className="bg-white text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 border border-gray-200"
          >
            🛵 My Location
          </button>
          <button
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setView([job.lat, job.lng], 16);
              }
            }}
            className="bg-white text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 border border-gray-200"
          >
            📍 Customer Spot
          </button>
        </div>
      </div>

      {/* Customer Quick Call & Details */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{job.customer}</h4>
            <p className="text-xs text-gray-500">Customer • {job.id}</p>
            <p className="text-xs font-semibold text-green-700 mt-0.5">💰 You Earn: ₹{job.earnings} (90% Fair Share)</p>
          </div>

          <a
            href={`tel:${job.customerPhone || '9876543210'}`}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1"
          >
            <span>📞</span>
            <span>Call Customer</span>
          </a>
        </div>

        {/* Workflow Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleStatusUpdate('on_the_way')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition text-center ${
              currentStatus === 'on_the_way'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            🛵 Start Travel
          </button>

          <button
            onClick={() => handleStatusUpdate('in_progress')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition text-center ${
              currentStatus === 'in_progress'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            ⚡ Arrived & Start
          </button>

          <button
            onClick={() => handleStatusUpdate('completed')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition text-center ${
              currentStatus === 'completed'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-green-50 text-green-800 hover:bg-green-100 border border-green-200'
            }`}
          >
            ✓ Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerNavigationMap;
