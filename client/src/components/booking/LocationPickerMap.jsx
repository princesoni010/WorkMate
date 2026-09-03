import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { getCurrentGpsCoordinates, reverseGeocodeCoordinates } from '../../utils/geolocation';

const LocationPickerMap = ({
  lat = 23.3641,
  lng = 85.3296,
  onLocationSelect,
  address = 'Kanke Road, Ranchi'
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [detecting, setDetecting] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [currentCoord, setCurrentCoord] = useState({ lat, lng });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [currentCoord.lat, currentCoord.lng],
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      // Custom Location Marker
      const customPin = L.divIcon({
        className: 'custom-picker-icon',
        html: `
          <div style="background-color: #FF9933; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 20px; cursor: grab;">
            📍
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker([currentCoord.lat, currentCoord.lng], {
        icon: customPin,
        draggable: true,
      }).addTo(map);

      marker.bindPopup(`<b>Selected Spot</b><br/>${address}`).openPopup();

      const handleCoordChange = async (newLat, newLng) => {
        setCurrentCoord({ lat: newLat, lng: newLng });
        const geoInfo = await reverseGeocodeCoordinates(newLat, newLng);
        marker.setPopupContent(`<b>Selected Spot</b><br/>${geoInfo.address || 'Custom Point'}`).openPopup();
        if (onLocationSelect) {
          onLocationSelect({
            lat: newLat,
            lng: newLng,
            address: geoInfo.address,
            locality: geoInfo.locality,
            pincode: geoInfo.pincode
          });
        }
      };

      marker.on('dragend', (event) => {
        const position = event.target.getLatLng();
        handleCoordChange(position.lat, position.lng);
      });

      map.on('click', (event) => {
        const { lat: clickLat, lng: clickLng } = event.latlng;
        marker.setLatLng([clickLat, clickLng]);
        handleCoordChange(clickLat, clickLng);
      });

      markerRef.current = marker;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleAutoDetect = async () => {
    setDetecting(true);
    setGpsError('');
    try {
      const coords = await getCurrentGpsCoordinates();
      const geoInfo = await reverseGeocodeCoordinates(coords.lat, coords.lng);

      setCurrentCoord({ lat: coords.lat, lng: coords.lng });

      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([coords.lat, coords.lng], 16);
      }
      if (markerRef.current) {
        markerRef.current.setLatLng([coords.lat, coords.lng]);
        markerRef.current.setPopupContent(`<b>🎯 Auto-Detected Current Location</b><br/>${geoInfo.address}`).openPopup();
      }

      if (onLocationSelect) {
        onLocationSelect({
          lat: coords.lat,
          lng: coords.lng,
          address: geoInfo.address,
          locality: geoInfo.locality,
          pincode: geoInfo.pincode
        });
      }
    } catch (err) {
      console.error('GPS auto-pickup error:', err);
      setGpsError(err.message || 'Could not auto-pickup GPS location');
    } finally {
      setDetecting(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 relative shadow-sm">
      <div ref={mapContainerRef} style={{ height: '240px', width: '100%' }} />

      {/* Floating Auto-Detect GPS Button */}
      <div className="absolute top-2 right-2 z-10">
        <button
          type="button"
          onClick={handleAutoDetect}
          disabled={detecting}
          className="bg-white/95 backdrop-blur-sm text-blue-900 border border-blue-300 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center space-x-1.5 transition disabled:opacity-50"
        >
          <span>🎯</span>
          <span>{detecting ? 'Detecting GPS...' : 'Auto-Pickup My Location'}</span>
        </button>
      </div>

      {gpsError && (
        <div className="absolute top-11 right-2 z-10 bg-red-100/95 text-red-700 text-[11px] p-2 rounded-lg shadow max-w-xs border border-red-300">
          {gpsError}
        </div>
      )}

      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-[11px] px-2.5 py-1 rounded-md text-gray-700 shadow border border-gray-200 z-10 flex items-center space-x-1">
        <span>📍</span>
        <span>Drag pin or click map to auto-update address</span>
      </div>
    </div>
  );
};

export default LocationPickerMap;
