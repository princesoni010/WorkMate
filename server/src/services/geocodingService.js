const { haversineDistance } = require('../utils/distance');

async function geocodeAddress(address) {
  try {
    // NOTE: Respect usage limits of Nominatim API - 1 req/sec max. 
    // Consider adding caching here for production.
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
    const response = await fetch(url, { headers: { 'User-Agent': 'WorkMate/1.0' }});
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }

  // Fallback demo coordinates (Ranchi)
  return {
    latitude: 23.3441,
    longitude: 85.3096
  };
}

module.exports = {
  haversineDistance,
  geocodeAddress
};
