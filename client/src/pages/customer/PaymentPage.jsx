import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { Navbar } from '../../components/layout';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  const [showRating, setShowRating] = useState(false);

  // Mock details
  const details = {
    service: 'Electrician',
    worker: 'Ramesh Kumar',
    date: '2026-09-03',
    location: 'Sector 4, Ranchi',
    amounts: {
      service: 350,
      travel: 100,
      urgent: 0,
      total: 450
    },
    allocation: {
      worker: 405,
      platform: 36,
      welfare: 9
    }
  };

  const handlePayment = () => {
    // mock processing
    setTimeout(() => {
      setIsPaid(true);
    }, 1500);
  };

  if (showRating) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Rate {details.worker}</h2>
          <p className="text-gray-500 mb-6">How was your service?</p>
          
          <div className="text-5xl text-gray-300 mb-6 flex justify-center gap-2 cursor-pointer">
            <span className="text-orange-500">★</span>
            <span className="text-orange-500">★</span>
            <span className="text-orange-500">★</span>
            <span className="text-orange-500">★</span>
            <span>★</span>
          </div>
          
          <textarea className="w-full p-3 border rounded-lg mb-4" rows="3" placeholder="Add a comment..."></textarea>
          
          <Button variant="primary" className="w-full bg-blue-900 text-white py-3" onClick={() => navigate('/customer/bookings')}>Submit Rating</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <main className="max-w-md mx-auto px-4 py-8">
        {!isPaid ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Payment Details</h1>
            
            <Card className="p-5">
              <h3 className="font-bold border-b pb-2 mb-3">Booking Summary</h3>
              <div className="text-sm space-y-2 text-gray-600">
                <p><strong>Service:</strong> {details.service}</p>
                <p><strong>Worker:</strong> {details.worker}</p>
                <p><strong>Date:</strong> {details.date}</p>
                <p><strong>Location:</strong> {details.location}</p>
              </div>
            </Card>

            <Card className="p-5 bg-blue-50 border-blue-100">
              <h3 className="font-bold border-b border-blue-200 pb-2 mb-3 text-blue-900">Payment Breakdown</h3>
              <div className="text-sm space-y-2 mb-4">
                <div className="flex justify-between"><span>Service Fee</span> <span>₹{details.amounts.service}</span></div>
                <div className="flex justify-between"><span>Travel Fee</span> <span>₹{details.amounts.travel}</span></div>
                <div className="flex justify-between font-bold text-lg border-t border-blue-200 pt-2 mt-2">
                  <span>Total Amount</span> <span>₹{details.amounts.total}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded text-xs">
                <div className="font-semibold mb-1 text-gray-700">Transparent Allocation Preview:</div>
                <ul className="list-disc pl-4 space-y-1 text-gray-600">
                  <li>Worker/Cooperative: 90% (₹{details.allocation.worker})</li>
                  <li>Platform Operations: 8% (₹{details.allocation.platform})</li>
                  <li className="text-orange-600 font-medium">Proposed Welfare Fund: 2% (₹{details.allocation.welfare})</li>
                </ul>
              </div>
            </Card>

            <div className="flex justify-center gap-4 py-2">
              <div className="flex flex-col items-center"><span className="text-xl">🔒</span><span className="text-[10px] text-gray-500">Secure Payment</span></div>
              <div className="flex flex-col items-center"><span className="text-xl">👁️</span><span className="text-[10px] text-gray-500">Transparent Allocation</span></div>
            </div>

            <Button variant="primary" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-bold rounded-xl" onClick={handlePayment}>
              Demo Payment (Simulated)
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center pt-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-4xl mx-auto mb-4">
                ✓
              </div>
              <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
              <p className="text-gray-500 mt-2">Thank you for using WorkMate</p>
            </div>
            
            <Card className="p-6 relative overflow-hidden">
              {/* Receipt zig-zag top/bottom could go here via CSS */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">₹{details.amounts.total}</h2>
                <p className="text-xs text-gray-400 mt-1">Paid on {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="space-y-3 text-sm border-t border-b py-4 mb-4 border-dashed">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking ID</span>
                  <span className="font-medium">{bookingId || 'WM-10023'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment ID</span>
                  <span className="font-medium">pay_abc123demo</span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg text-xs space-y-1">
                <div className="font-semibold text-green-800 mb-1">Impact of your payment:</div>
                <div className="flex justify-between"><span>Worker earned:</span> <span>₹{details.allocation.worker}</span></div>
                <div className="flex justify-between"><span>Welfare contribution:</span> <span>₹{details.allocation.welfare}</span></div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button variant="primary" className="w-full bg-blue-600 text-white py-3" onClick={() => setShowRating(true)}>
                Rate this Service
              </Button>
              <Button variant="outline" className="w-full py-3" onClick={() => alert('Downloading receipt...')}>
                Download Receipt
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PaymentPage;
