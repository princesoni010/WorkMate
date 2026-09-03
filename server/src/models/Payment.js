const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  mode: { type: String, enum: ['razorpay_test', 'demo_simulation'], default: 'demo_simulation' },
  status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  razorpayOrderId: { type: String, default: null },
  razorpayPaymentId: { type: String, default: null },
  allocation: {
    workerShare: Number,
    platformShare: Number,
    welfareContribution: Number
  },
  paidAt: { type: Date, default: null }
}, { timestamps: true });

paymentSchema.index({ bookingId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
