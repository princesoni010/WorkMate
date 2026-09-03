import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button, StatusBadge } from '../../components/common';
import useAuth from '../../hooks/useAuth';
import { getMyBookings } from '../../services/bookingService';
import { getCurrentGpsCoordinates, reverseGeocodeCoordinates } from '../../utils/geolocation';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentLocation, setCurrentLocation] = useState('Ranchi, Jharkhand');
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const services = [
    { id: 'electrician', name: 'Electrician', hindi: 'इलेक्ट्रीशियन', icon: '⚡' },
    { id: 'plumber', name: 'Plumber', hindi: 'प्लंबर', icon: '🔧' },
    { id: 'carpenter', name: 'Carpenter', hindi: 'बढ़ई', icon: '🪚' },
    { id: 'painter', name: 'Painter', hindi: 'पेंटर', icon: '🎨' },
    { id: 'domestic_helper', name: 'Domestic Help', hindi: 'घरेलू सहायक', icon: '🧹' },
    { id: 'caregiver', name: 'Caregiver', hindi: 'देखभालकर्ता', icon: '❤️' },
    { id: 'driver', name: 'Driver', hindi: 'ड्राइवर', icon: '🚗' },
    { id: 'gardener', name: 'Gardener', hindi: 'माली', icon: '🌱' },
    { id: 'technician', name: 'Technician', hindi: 'तकनीशियन', icon: '⚙️' },
  ];

  useEffect(() => {
    getMyBookings()
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          setRecentBookings(data.slice(0, 3));
        }
      })
      .catch((err) => {
        console.warn('Could not load user bookings:', err);
      })
      .finally(() => setLoadingBookings(false));
  }, []);

  const handleAutoLocate = async () => {
    setDetectingLocation(true);
    try {
      const coords = await getCurrentGpsCoordinates();
      const geo = await reverseGeocodeCoordinates(coords.lat, coords.lng);
      setCurrentLocation(`${geo.locality || 'Ranchi'}, ${geo.state || 'Jharkhand'}`);
    } catch (err) {
      console.warn('Auto locate error:', err);
    } finally {
      setDetectingLocation(false);
    }
  };

  const userName = user?.name || 'Customer';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header & Location Auto-Pickup */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Welcome back</p>
          <h1 className="text-xl font-bold text-gray-900">Hello, {userName}! 👋</h1>
        </div>

        <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
          <span className="text-sm">📍</span>
          <span className="text-xs font-bold text-blue-900">{currentLocation}</span>
          <button
            onClick={handleAutoLocate}
            disabled={detectingLocation}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-white px-2 py-0.5 rounded shadow-xs border border-blue-200"
          >
            {detectingLocation ? '...' : '🎯 Auto-Pick'}
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-xl text-xs font-semibold text-orange-900">
          ✓ Verified Workers
        </div>
        <div className="p-2.5 bg-green-50/70 border border-green-200 rounded-xl text-xs font-semibold text-green-900">
          ✓ 90% Fair Wages
        </div>
        <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900">
          ✓ 2% Welfare Pool
        </div>
      </div>

      {/* Quick Search */}
      <div className="mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search Electrician, Plumber, Carpenter, Painter..." 
            className="w-full p-4 pr-12 rounded-2xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#FF9933] focus:border-transparent text-sm bg-white"
            onClick={() => navigate('/customer/search')}
            readOnly
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-800">Explore Cooperative Services</h2>
          <span className="text-xs font-bold text-orange-600 cursor-pointer" onClick={() => navigate('/customer/search')}>
            View All →
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-orange-50/50 hover:border-orange-300 transition border border-gray-200 rounded-2xl group shadow-xs"
              onClick={() => navigate(`/customer/search?service=${service.id}`)}
            >
              <div className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">{service.icon}</div>
              <div className="text-xs font-bold text-gray-800 text-center">{service.name}</div>
              <div className="text-[10px] text-gray-400 text-center">{service.hindi}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Bookings Section (Only real user data) */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-800">Recent Service Bookings</h2>
          <span className="text-xs font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/customer/bookings')}>
            See All Bookings
          </span>
        </div>

        {loadingBookings ? (
          <div className="text-xs text-gray-400 py-4 text-center">Loading bookings...</div>
        ) : recentBookings.length > 0 ? (
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <Card
                key={b._id || b.bookingCode}
                className="p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
                onClick={() => navigate('/customer/bookings')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 capitalize">{b.serviceType} Service</h3>
                    <p className="text-xs text-gray-500">Code: {b.bookingCode || b._id}</p>
                  </div>
                  <StatusBadge status={b.status} type="booking" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center border-dashed border-2 border-gray-200 bg-white rounded-2xl">
            <p className="text-sm font-semibold text-gray-600 mb-1">No Bookings Yet</p>
            <p className="text-xs text-gray-400 mb-4">Book your first service with verified cooperative professionals.</p>
            <Button variant="primary" size="sm" onClick={() => navigate('/customer/book')}>
              + Book a Service Now
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Home;
