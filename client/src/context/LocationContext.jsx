import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentGpsCoordinates, reverseGeocodeCoordinates } from '../utils/geolocation';

const LocationContext = createContext(null);

const DEFAULT_LOCATION = {
  name: 'Ranchi, Jharkhand',
  city: 'Ranchi',
  state: 'Jharkhand',
  lat: 23.3441,
  lng: 85.3096,
  isOutsideRanchi: false
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
    return DEFAULT_LOCATION;
  });

  const [detecting, setDetecting] = useState(false);

  const updateLocation = (newLoc) => {
    const isOutside = !newLoc.name?.toLowerCase().includes('ranchi') && !newLoc.city?.toLowerCase().includes('ranchi');
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
      console.warn('Auto location failed:', err);
      throw err;
    } finally {
      setDetecting(false);
    }
  };

  const resetToRanchi = () => {
    updateLocation(DEFAULT_LOCATION);
  };

  return (
    <LocationContext.Provider value={{ location, detecting, autoDetectLocation, updateLocation, resetToRanchi }}>
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
