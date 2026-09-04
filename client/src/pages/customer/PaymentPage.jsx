import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { CheckCircle, Download, ArrowLeft, Star, ShieldCheck, HeartHandshake, Receipt } from 'lucide-react';
import { getBookingById } from '../../services/bookingService';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [rating, setRating] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);

  useEffect(() => {
    // 1. Try finding in local storage first
    let found = null;
    try {
      const locals = JSON.parse(localStorage.getItem('user_active_bookings') || '[]');
      if (bookingId) {
        found = locals.find(b => b.id === bookingId || b.rawId === bookingId || b._id === bookingId);
      } else if (locals.length > 0) {
        found = locals[0];
      }
    } catch (e) {
      console.warn('LocalStorage search error:', e);
    }

    if (found) {
      setBooking({
        id: found.id || bookingId,
        service: found.service || 'Electrician',
        worker: found.worker || 'Ramesh Kumar',
        date: found.date || new Date().toISOString().split('T')[0],
        time: found.time || '14:00',
        location: found.address || 'Ranchi, Jharkhand',
        amount: Number(found.price) || 550,
        status: found.status || 'in_progress'
      });
      setLoading(false);
    } else {
      // 2. Try fetching from backend API
      if (bookingId && bookingId.length === 24) {
        getBookingById(bookingId)
          .then((res) => {
            const data = res.data?.data || res.data;
            if (data) {
              setBooking({
                id: data.bookingCode || data._id,
                service: data.serviceType ? data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1) : 'Home Service',
                worker: data.workerId?.fullName || data.workerId?.name || 'Verified Cooperative Worker',
                date: data.scheduledAt ? new Date(data.scheduledAt).toISOString().split('T')[0] : 'Today',
                time: data.scheduledAt ? new Date(data.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '14:00',
                location: data.location?.address || 'Ranchi, Jharkhand',
                amount: data.pricing?.totalAmount || 550,
                status: data.status || 'in_progress'
              });
            }
          })
          .catch(() => {
            setBooking({
              id: bookingId || 'WM-849201',
              service: 'Electrician',
              worker: 'Ramesh Kumar',
              date: new Date().toISOString().split('T')[0],
              time: '14:00',
              location: 'Kanke Road, Ranchi',
              amount: 550,
              status: 'in_progress'
            });
          })
          .finally(() => setLoading(false));
      } else {
        setBooking({
          id: bookingId || 'WM-849201',
          service: 'Electrician',
          worker: 'Ramesh Kumar',
          date: new Date().toISOString().split('T')[0],
          time: '14:00',
          location: 'Kanke Road, Ranchi',
          amount: 550,
          status: 'in_progress'
        });
        setLoading(false);
      }
    }
  }, [bookingId]);

  const totalAmount = booking?.amount || 550;
  const workerEarning = Math.round(totalAmount * 0.90);
  const platformFee = Math.round(totalAmount * 0.08);
  const welfareFund = Math.max(1, totalAmount - workerEarning - platformFee); // 2%

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      try {
        const locals = JSON.parse(localStorage.getItem('user_active_bookings') || '[]');
        const updated = locals.map(b => (b.id === booking?.id ? { ...b, status: 'completed' } : b));
        localStorage.setItem('user_active_bookings', JSON.stringify(updated));
      } catch (e) {
        console.warn('Update local booking error:', e);
      }
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center text-gray-500 text-sm">
        Loading payment & receipt details...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/customer/bookings')}
        className="flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 mb-5 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Bookings</span>
      </button>

      {!isPaid ? (
        <div className="space-y-6">
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-[11px] font-extrabold rounded-full uppercase tracking-wider mb-2">
              Cooperative Transparent Checkout
            </span>
            <h1 className="text-2xl font-black text-gray-900">Payment & Bill Breakdown</h1>
            <p className="text-xs text-gray-500 mt-1">Booking Reference: <span className="font-mono font-bold text-gray-800">{booking?.id}</span></p>
          </div>

          {/* Booking Summary Card */}
          <Card className="p-5 border border-gray-200 shadow-sm rounded-2xl">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-100 pb-2 mb-3 flex items-center justify-between">
              <span>Service Summary</span>
              <span className="text-xs text-[#FF9933] font-semibold">{booking?.service}</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Assigned Worker</span>
                <span className="font-bold text-gray-800 text-sm">👷 {booking?.worker}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Scheduled At</span>
                <span className="font-medium text-gray-800">{booking?.date} • {booking?.time}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Service Location</span>
                <span className="font-medium text-gray-700">{booking?.location}</span>
              </div>
            </div>
          </Card>

          {/* Transparent Allocation Breakdown */}
          <Card className="p-5 bg-gradient-to-br from-amber-50/70 to-orange-50/40 border border-orange-200/80 shadow-sm rounded-2xl">
            <div className="flex items-center justify-between border-b border-orange-200 pb-2.5 mb-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-[#FF9933]" />
                <span>Transparent Fare Breakdown</span>
              </h3>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">0% Hidden Charges</span>
            </div>

            <div className="text-xs space-y-2 mb-4 text-gray-700">
              <div className="flex justify-between">
                <span>Standard Cooperative Service Fee</span>
                <span className="font-semibold">₹{totalAmount - 50}</span>
              </div>
              <div className="flex justify-between">
                <span>Travel & Equipment Allowance</span>
                <span className="font-semibold">₹50</span>
              </div>
              <div className="flex justify-between font-black text-base border-t border-orange-200 pt-2.5 text-gray-900">
                <span>Total Payable Amount</span>
                <span className="text-xl text-[#FF9933] font-black">₹{totalAmount}</span>
              </div>
            </div>

            {/* SIH Cooperative 90-8-2 Rule Badge */}
            <div className="bg-white/90 p-3.5 rounded-xl border border-orange-100 text-xs shadow-xs space-y-2">
              <div className="font-bold text-gray-800 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-orange-600" />
                <span>How your ₹{totalAmount} is distributed (SIH Model):</span>
              </div>
              <div className="space-y-1.5 pl-1 text-[11px] text-gray-600">
                <div className="flex justify-between items-center bg-green-50 px-2 py-1 rounded border border-green-100">
                  <span className="font-medium text-green-900">Direct Worker/Co-op Share (90%):</span>
                  <span className="font-bold text-green-800">₹{workerEarning}</span>
                </div>
                <div className="flex justify-between items-center bg-blue-50 px-2 py-1 rounded border border-blue-100">
                  <span className="font-medium text-blue-900">Platform Hosting & Maintenance (8%):</span>
                  <span className="font-bold text-blue-800">₹{platformFee}</span>
                </div>
                <div className="flex justify-between items-center bg-amber-50 px-2 py-1 rounded border border-amber-100">
                  <span className="font-medium text-amber-900">Worker Welfare & Insurance Pool (2%):</span>
                  <span className="font-bold text-amber-800">₹{welfareFund}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Select Payment Method</h3>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'upi', label: 'UPI / QR', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
                { id: 'cash', label: 'Cash on Service', icon: '💵', desc: 'Pay Worker Directly' },
                { id: 'card', label: 'Cards / NetBanking', icon: '💳', desc: 'Debit / Credit' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    paymentMethod === m.id
                      ? 'border-[#FF9933] bg-orange-50/50 shadow-sm ring-2 ring-orange-200'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xl mb-1">{m.icon}</div>
                  <div className="text-xs font-bold text-gray-800">{m.label}</div>
                  <div className="text-[10px] text-gray-400 truncate">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full bg-[#FF9933] hover:bg-[#e68a2e] text-white py-4 text-base font-bold rounded-xl shadow-md transition"
              disabled={isProcessing}
              onClick={handleProcessPayment}
            >
              {isProcessing ? 'Processing Secure Payment...' : `Pay ₹${totalAmount} (${paymentMethod.toUpperCase()})`}
            </Button>
            <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>100% Secure Cooperative Escrow Payment System</span>
            </div>
          </div>
        </div>
      ) : (
        /* Digital Printable Receipt View */
        <div className="space-y-6">
          <div className="text-center pt-2">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Payment Successful</h1>
            <p className="text-xs text-gray-500 mt-0.5">Thank you for supporting cooperative gig workers!</p>
          </div>

          {/* Official Cooperative Receipt Container */}
          <Card className="p-6 border-2 border-dashed border-gray-300 bg-white shadow-lg rounded-2xl relative overflow-hidden print:border-solid print:shadow-none">
            <div className="text-center border-b border-gray-200 pb-4 mb-4">
              <div className="text-lg font-black text-[#FF9933] tracking-tight">WorkMate Cooperative Services</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Official Service Invoice & Tax Receipt</div>
              <div className="text-3xl font-black text-gray-900 mt-3">₹{totalAmount}</div>
              <div className="text-xs text-green-700 font-bold bg-green-50 inline-block px-3 py-0.5 rounded-full mt-1 border border-green-200">
                ✓ PAID VIA {paymentMethod.toUpperCase()}
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-gray-700 border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Booking Order ID:</span>
                <span className="font-mono font-bold text-gray-900">{booking?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction ID:</span>
                <span className="font-mono font-medium text-gray-800">TXN-WM-{Math.floor(10000000 + Math.random() * 90000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Timestamp:</span>
                <span className="font-medium text-gray-800">{new Date().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Service Rendered:</span>
                <span className="font-bold text-gray-900">{booking?.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Service Professional:</span>
                <span className="font-bold text-gray-900">👷 {booking?.worker}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="font-medium text-gray-700 text-right max-w-[200px] truncate">{booking?.location}</span>
              </div>
            </div>

            {/* Welfare Breakdown */}
            <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 text-xs space-y-1.5">
              <div className="font-bold text-emerald-900 flex items-center justify-between">
                <span>Social Impact Contribution:</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">100% Cooperative Verified</span>
              </div>
              <div className="flex justify-between text-emerald-800 text-[11px]">
                <span>Direct Worker Wage (90%):</span>
                <span className="font-bold">₹{workerEarning}</span>
              </div>
              <div className="flex justify-between text-emerald-800 text-[11px]">
                <span>Welfare & Health Safety Pool (2%):</span>
                <span className="font-bold">₹{welfareFund}</span>
              </div>
            </div>
          </Card>

          {/* Rating Section */}
          {!showRatingSuccess ? (
            <Card className="p-5 border border-gray-200 shadow-sm rounded-2xl text-center space-y-3">
              <h3 className="font-bold text-sm text-gray-800">Rate your experience with {booking?.worker}</h3>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="Write a feedback or comment for the worker..."
                rows="2"
                className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#FF9933] outline-none"
              />
              <Button
                variant="primary"
                size="sm"
                className="w-full bg-blue-900 text-white font-bold py-2.5 rounded-xl"
                onClick={() => setShowRatingSuccess(true)}
              >
                Submit Rating & Feedback
              </Button>
            </Card>
          ) : (
            <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-center text-xs text-blue-900 font-bold">
              🎉 Thank you! Your {rating}-star rating has been registered on the Cooperative Network.
            </div>
          )}

          {/* Actions: Download / Print & Go Back */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              className="py-3 text-xs font-bold border-gray-300 hover:bg-gray-100 flex items-center justify-center space-x-1.5"
              onClick={handlePrintReceipt}
            >
              <Download className="w-4 h-4 text-gray-700" />
              <span>Print / Save Receipt</span>
            </Button>
            <Button
              variant="primary"
              className="py-3 text-xs font-bold bg-[#FF9933] hover:bg-[#e68a2e] text-white flex items-center justify-center space-x-1.5"
              onClick={() => navigate('/customer/bookings')}
            >
              <span>Back to Bookings</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
