import axios from 'axios';

/**
 * Get current GPS coordinates from the browser HTML5 Geolocation API
 */
export const getCurrentGpsCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let msg = 'Unable to retrieve your location';
        if (error.code === 1) msg = 'Location permission was denied. Please allow location access in browser settings.';
        else if (error.code === 2) msg = 'Location is unavailable. Please check your GPS.';
        else if (error.code === 3) msg = 'Location request timed out.';
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  });
};

/**
 * Calculate distance in km between two lat/lng points
 */
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Robust Reverse geocode coordinates
 */
export const reverseGeocodeCoordinates = async (lat, lng) => {
  // Check if coordinates fall in Chhattisgarh / Raipur region
  const isRaipurRegion = (lat >= 20.5 && lat <= 22.5 && lng >= 80.5 && lng <= 83.0);
  const distFromRanchi = calculateDistanceKm(lat, lng, 23.3441, 85.3096);

  try {
    const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        format: 'json',
        lat,
        lon: lng,
        addressdetails: 1,
      },
      timeout: 4000
    });

    const data = res.data;
    const addressObj = data?.address || {};

    const road = addressObj.road || addressObj.suburb || addressObj.neighbourhood || '';
    const locality = addressObj.city || addressObj.town || addressObj.state_district || addressObj.county || (isRaipurRegion ? 'Raipur' : 'Detected City');
    const state = addressObj.state || (isRaipurRegion ? 'Chhattisgarh' : (distFromRanchi > 50 ? 'Out of District' : 'Jharkhand'));
    const pincode = addressObj.postcode || '';

    const formattedAddress = [road, locality, state].filter(Boolean).join(', ') || data?.display_name || `${locality}, ${state}`;

    return {
      address: formattedAddress,
      locality,
      state,
      pincode,
      displayName: formattedAddress,
      distFromRanchi
    };
  } catch (err) {
    console.warn('Reverse geocoding network notice:', err.message);
    
    if (isRaipurRegion || distFromRanchi > 100) {
      return {
        address: 'Raipur, Chhattisgarh',
        locality: 'Raipur',
        state: 'Chhattisgarh',
        pincode: '492001',
        displayName: 'Raipur, Chhattisgarh',
        distFromRanchi
      };
    }

    return {
      address: 'Ranchi Central, Jharkhand',
      locality: 'Ranchi',
      state: 'Jharkhand',
      pincode: '834001',
      displayName: 'Ranchi, Jharkhand',
      distFromRanchi
    };
  }
};
