const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  isFlagged: { type: Boolean, default: false },
  moderationStatus: { type: String, enum: ['active', 'hidden', 'removed'], default: 'active' }
}, { timestamps: true });

ratingSchema.index({ workerId: 1 });

module.exports = mongoose.model('Rating', ratingSchema);
