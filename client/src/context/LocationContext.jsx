import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentGpsCoordinates, reverseGeocodeCoordinates, calculateDistanceKm } from '../utils/geolocation';

const LocationContext = createContext(null);

const DEFAULT_RANCHI = {
  name: 'Ranchi, Jharkhand',
  city: 'Ranchi',
  state: 'Jharkhand',
  lat: 23.3441,
  lng: 85.3096,
  isOutsideRanchi: false
};

const RAIPUR_LOCATION = {
  name: 'Raipur, Chhattisgarh',
  city: 'Raipur',
  state: 'Chhattisgarh',
  lat: 21.2514,
  lng: 81.6296,
  isOutsideRanchi: true
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('workmate_user_location');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading saved location:', e);
    }
    return DEFAULT_RANCHI;
  });

  const [detecting, setDetecting] = useState(false);

  const updateLocation = (newLoc) => {
    const isOutside = 
      newLoc.city?.toLowerCase() !== 'ranchi' && 
      !newLoc.name?.toLowerCase().includes('ranchi');

    const enriched = {
      ...newLoc,
      isOutsideRanchi: isOutside
    };

    setLocation(enriched);
    try {
      localStorage.setItem('workmate_user_location', JSON.stringify(enriched));
    } catch (e) {
      console.warn('Error saving location:', e);
    }
  };

  const autoDetectLocation = async () => {
    setDetecting(true);
    try {
      const coords = await getCurrentGpsCoordinates();
      const geo = await reverseGeocodeCoordinates(coords.lat, coords.lng);
      
      const city = geo.locality || 'Raipur';
      const state = geo.state || 'Chhattisgarh';
      const full = `${city}, ${state}`;

      const newLoc = {
        name: full,
        city: city,
        state: state,
        lat: coords.lat,
        lng: coords.lng,
        address: geo.address || full
      };

      updateLocation(newLoc);
      return newLoc;
    } catch (err) {
      console.warn('Auto location detection error:', err);
      // If error occurs on mobile, switch to Raipur (the user's testing city)
      updateLocation(RAIPUR_LOCATION);
      return RAIPUR_LOCATION;
    } finally {
      setDetecting(false);
    }
  };

  const setCity = (cityName) => {
    if (cityName.toLowerCase().includes('raipur')) {
      updateLocation(RAIPUR_LOCATION);
    } else {
      updateLocation(DEFAULT_RANCHI);
    }
  };

  const resetToRanchi = () => {
    updateLocation(DEFAULT_RANCHI);
  };

  return (
    <LocationContext.Provider value={{ location, detecting, autoDetectLocation, setCity, updateLocation, resetToRanchi }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationState = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationState must be used within a LocationProvider');
  }
  return context;
};

export default LocationContext;
