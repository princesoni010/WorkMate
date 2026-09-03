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
        if (error.code === 1) msg = 'Location permission was denied. Please allow location access.';
        else if (error.code === 2) msg = 'Location is unavailable. Check your network or GPS.';
        else if (error.code === 3) msg = 'Location request timed out.';
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
};

/**
 * Reverse geocode coordinates using OpenStreetMap Nominatim
 */
export const reverseGeocodeCoordinates = async (lat, lng) => {
  try {
    const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        format: 'json',
        lat,
        lon: lng,
        addressdetails: 1,
      },
      headers: {
        'Accept-Language': 'en',
      },
    });

    const data = res.data;
    const addressObj = data?.address || {};

    const road = addressObj.road || addressObj.suburb || addressObj.neighbourhood || '';
    const locality = addressObj.city || addressObj.town || addressObj.county || addressObj.state_district || 'Ranchi';
    const state = addressObj.state || 'Jharkhand';
    const pincode = addressObj.postcode || '';

    const formattedAddress = [road, locality, state].filter(Boolean).join(', ') || data?.display_name || 'Detected Location';

    return {
      address: formattedAddress,
      locality,
      state,
      pincode,
      displayName: data?.display_name || formattedAddress,
    };
  } catch (err) {
    console.warn('Reverse geocoding error (using fallback):', err);
    return {
      address: 'Current Location',
      locality: 'Ranchi',
      state: 'Jharkhand',
      pincode: '834001',
      displayName: 'Ranchi, Jharkhand',
    };
  }
};
