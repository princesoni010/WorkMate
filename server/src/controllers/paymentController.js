const asyncHandler = require('../utils/asyncHandler');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const WelfareLedger = require('../models/WelfareLedger');
const { calculateAllocation } = require('../services/paymentSplitService');

exports.createOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  if (booking.status !== 'completed') return res.status(400).json({ success: false, message: 'Booking not completed' });
  
  const amount = booking.pricing?.finalAmount || booking.pricing?.estimatedAmount || 500;
  
  // demo simulation order
  const orderDetails = {
    id: 'demo_order_' + Date.now(),
    amount: amount,
    currency: 'INR'
  };
  
  const payment = await Payment.create({
    bookingId,
    customerId: req.user._id,
    amount,
    currency: 'INR',
    gatewayOrderId: orderDetails.id,
    status: 'pending'
  });
  
  res.json({ success: true, data: { orderDetails, paymentId: payment._id } });
});

exports.verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId, bookingId } = req.body;
  const query = paymentId ? { _id: paymentId } : { bookingId };
  
  const payment = await Payment.findOne(query);
  if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
  
  const allocation = calculateAllocation(payment.amount);
  
  payment.status = 'paid';
  payment.paidAt = new Date();
  payment.allocation = allocation;
  await payment.save();
  
  const booking = await Booking.findById(payment.bookingId);
  booking.status = 'rated'; // eligible for rating
  await booking.save();
  
  if (booking.workerId) {
    await WelfareLedger.create({
      workerId: booking.workerId,
      amount: allocation.welfareContribution,
      type: 'contribution',
      description: `Welfare contribution from booking ${booking._id}`,
      paymentId: payment._id,
      cooperativeId: booking.cooperativeId || null
    });
  }
  
  res.json({ success: true, data: payment });
});

exports.getPaymentByBooking = asyncHandler(async (req, res) => {
  const payment = await Payment.findOne({ bookingId: req.params.bookingId });
  if (!payment) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: payment });
});
