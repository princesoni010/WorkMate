const mongoose = require('mongoose');
const crypto = require('crypto');

const bookingSchema = new mongoose.Schema({
  bookingCode: { type: String, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  cooperativeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cooperative', default: null },
  serviceType: { type: String, required: true },
  subService: { type: String, default: null },
  description: { type: String, required: true },
  jobImageUrls: [{ type: String }],
  scheduledAt: { type: Date, required: true },
  location: {
    address: { type: String, required: true },
    locality: String,
    pincode: String,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  isEmergency: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['requested', 'matched', 'accepted', 'on_the_way', 'in_progress', 'completed', 'rated', 'disputed', 'cancelled'],
    default: 'requested'
  },
  matchExplanation: [{ type: String }],
  manualAssignmentReason: { type: String, default: null },
  pricing: {
    serviceAmount: { type: Number, default: 0 },
    travelCharge: { type: Number, default: 0 },
    urgentCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 }
  },
  timeline: [{
    status: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: { type: String, default: '' },
    at: { type: Date, default: Date.now }
  }],
  isDemoData: { type: Boolean, default: true }
}, { timestamps: true });

bookingSchema.pre('save', function(next) {
  if (!this.bookingCode) {
    this.bookingCode = 'WM-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  }
  next();
});

bookingSchema.index({ customerId: 1 });
bookingSchema.index({ workerId: 1 });
bookingSchema.index({ cooperativeId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ serviceType: 1 });
bookingSchema.index({ scheduledAt: 1 });
bookingSchema.index({ isEmergency: 1 });
bookingSchema.index({ bookingCode: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
