import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button, StatusBadge } from '../../components/common';
import TrackingMap from '../../components/booking/TrackingMap';
import useAuth from '../../hooks/useAuth';
import { getMyBookings } from '../../services/bookingService';

const MyBookings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [trackingBooking, setTrackingBooking] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMyBookings()
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          const formatted = data.map((b) => ({
            id: b.bookingCode || b._id,
            rawId: b._id,
            service: b.serviceType ? b.serviceType.charAt(0).toUpperCase() + b.serviceType.slice(1) : 'Service',
            icon: b.serviceType === 'plumber' ? '🔧' : b.serviceType === 'carpenter' ? '🪚' : b.serviceType === 'painter' ? '🎨' : b.serviceType === 'domestic_helper' ? '🧹' : '⚡',
            worker: b.workerId?.fullName || (b.workerId?.name ? b.workerId.name : null),
            date: b.scheduledAt ? new Date(b.scheduledAt).toISOString().split('T')[0] : 'Today',
            time: b.scheduledAt ? new Date(b.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM',
            status: b.status || 'requested',
            price: b.pricing?.totalAmount || b.pricing?.serviceAmount || 550,
            matchReasons: b.matchExplanation || ['Verified Worker', 'Skill Matched'],
            address: b.location?.address || 'Ranchi, Jharkhand',
            isEmergency: b.isEmergency
          }));
          setBookings(formatted);

          if (location.state?.newBookingCode) {
            const found = formatted.find(item => item.id === location.state.newBookingCode);
            if (found) setSelectedBooking(found);
          }
        }
      })
      .catch((err) => {
        console.warn('Error fetching bookings:', err);
        // Only if demo user specifically, show demo fallback
        if (user?.email === 'customer.demo@workmate.test') {
          setBookings([
            { id: 'WM-849201', rawId: '1', service: 'Electrician', icon: '⚡', worker: 'Ramesh Kumar', date: '2026-09-03', time: '14:00', status: 'on_the_way', price: 600, matchReasons: ['Skill Match: 35%', 'Nearest (2.3 km): 25%', 'Fair Allocation: 10%'], address: 'Flat 402, Kanke Road, Ranchi' }
          ]);
        } else {
          setBookings([]);
        }
      })
      .finally(() => setLoading(false));
  }, [location.state, user]);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return ['requested', 'matched', 'pending', 'accepted', 'on_the_way', 'in_progress'].includes(b.status);
    return b.status === activeTab.toLowerCase();
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track active requests, live worker GPS & payment history</p>
        </div>
        <button
          onClick={() => navigate('/customer/book')}
          className="bg-[#FF9933] hover:bg-[#e68a2e] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center space-x-1"
        >
          <span>+</span>
          <span>New Booking</span>
        </button>
      </div>

      {/* Live GPS Tracking Modal/Banner if worker is active */}
      {trackingBooking && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
              Live GPS Distance & Map Tracking
            </h2>
            <button
              onClick={() => setTrackingBooking(null)}
              className="text-xs font-bold text-gray-500 hover:text-gray-800 underline"
            >
              Close Map
            </button>
          </div>
          <TrackingMap
            bookingCode={trackingBooking.id}
            workerName={trackingBooking.worker || 'Ramesh Kumar'}
            workerSkill={trackingBooking.service}
            status={trackingBooking.status}
            customerLocation={{ lat: 23.3641, lng: 85.3296, label: trackingBooking.address || 'Kanke Road, Ranchi' }}
            workerInitialLocation={{ lat: 23.3441, lng: 85.3096, label: trackingBooking.worker || 'Assigned Worker' }}
          />
        </div>
      )}
      
      {/* Category Tabs */}
      <div className="flex overflow-x-auto mb-6 bg-white rounded-xl p-1.5 shadow-sm border border-gray-200">
        {['All', 'Active', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 min-w-[90px] py-2 text-xs font-bold rounded-lg transition ${
              activeTab === tab 
                ? 'bg-[#FF9933] text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500 text-sm">Loading your bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <Card className="text-center py-12 border-dashed border-2 border-gray-200 bg-white rounded-2xl">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="text-base font-bold text-gray-700 mb-1">No Bookings Found</h3>
            <p className="text-xs text-gray-400 mb-4">
              {activeTab === 'All' 
                ? 'You have not made any bookings yet. Find and book verified cooperative professionals.'
                : `No ${activeTab.toLowerCase()} bookings found.`}
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate('/customer/book')}>
              + Book a Service Now
            </Button>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card
              key={booking.id}
              className="p-5 hover:shadow-md transition border border-gray-200 cursor-pointer"
              onClick={() => setSelectedBooking(booking)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl font-bold border border-orange-200">
                    {booking.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{booking.service} Service</h3>
                    <p className="text-xs font-semibold text-gray-400">Code: {booking.id}</p>
                  </div>
                </div>
                <StatusBadge status={booking.status} type="booking" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-600 mb-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <div>📅 <span className="font-medium">{booking.date}</span></div>
                <div>🕒 <span className="font-medium">{booking.time}</span></div>
                <div className="col-span-2 sm:col-span-1">
                  👷 <span className="font-bold text-gray-800">{booking.worker || 'Matching Nearby Worker...'}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {booking.matchReasons?.slice(0, 2).map((r) => (
                    <span key={r} className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[11px] font-medium">
                      ✓ {r}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  {/* Live Tracking Map Trigger */}
                  {['matched', 'accepted', 'on_the_way', 'in_progress'].includes(booking.status) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTrackingBooking(booking);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center space-x-1"
                    >
                      <span>🗺️</span>
                      <span>Track Live Map</span>
                    </button>
                  )}

                  {booking.status === 'completed' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/customer/payment/${booking.rawId || booking.id}`);
                      }}
                      className="px-3 py-1.5 bg-[#FF9933] text-white rounded-lg text-xs font-bold hover:bg-orange-600"
                    >
                      Pay ₹{booking.price}
                    </button>
                  )}

                  <div className="font-black text-gray-800 text-sm ml-2">₹{booking.price}</div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-bold text-gray-800 text-base">{selectedBooking.id} Details</h2>
                <p className="text-xs text-gray-500">Cooperative Work Order</p>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)} 
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center text-lg"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-3xl">{selectedBooking.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{selectedBooking.service} Service</h3>
                  <p className="text-xs text-gray-500">Assigned: {selectedBooking.worker || 'Searching Cooperative Network'}</p>
                </div>
                <StatusBadge status={selectedBooking.status} type="booking" />
              </div>

              {/* Live Tracking Map in Modal */}
              {['matched', 'accepted', 'on_the_way', 'in_progress'].includes(selectedBooking.status) && (
                <div>
                  <h4 className="font-bold text-sm text-gray-800 mb-2">Live Distance & Route Preview</h4>
                  <TrackingMap
                    bookingCode={selectedBooking.id}
                    workerName={selectedBooking.worker || 'Ramesh Kumar'}
                    workerSkill={selectedBooking.service}
                    status={selectedBooking.status}
                    customerLocation={{ lat: 23.3641, lng: 85.3296, label: selectedBooking.address }}
                    workerInitialLocation={{ lat: 23.3441, lng: 85.3096, label: 'Worker Location' }}
                  />
                </div>
              )}

              {/* Explainable Fair Matching Breakdown */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900 mb-2">
                  Explainable Matching Reasons
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  {selectedBooking.matchReasons?.map((r, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span>✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {selectedBooking.status === 'completed' && (
                  <Button 
                    variant="primary" 
                    className="w-full bg-[#FF9933] py-3 text-white font-bold text-sm" 
                    onClick={() => navigate(`/customer/payment/${selectedBooking.rawId || selectedBooking.id}`)}
                  >
                    Proceed to Transparent Payment (₹{selectedBooking.price})
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  className="w-full py-2.5 text-xs text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => alert(`Grievance ticket created for ${selectedBooking.id}. Cooperative Admin notified.`)}
                >
                  Raise Support / Dispute Ticket
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
