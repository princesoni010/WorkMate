const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  cooperativeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cooperative', required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  profilePhotoUrl: { type: String, default: null },
  status: {
    type: String,
    enum: ['draft', 'pending', 'verified', 'rejected', 'correction_required'],
    default: 'draft'
  },
  verificationNote: { type: String, default: null },
  skills: [{
    name: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    certificateUrl: { type: String, default: null },
    skillVerified: { type: Boolean, default: false }
  }],
  serviceArea: {
    addressLabel: String,
    district: String,
    latitude: Number,
    longitude: Number,
    radiusKm: { type: Number, default: 10 }
  },
  availability: {
    isAvailableNow: { type: Boolean, default: true },
    slots: [{ day: String, start: String, end: String }]
  },
  ratingAverage: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  jobsAssignedThisWeek: { type: Number, default: 0 },
  documents: [{
    type: { type: String },
    url: String,
    status: { type: String, enum: ['uploaded', 'verified', 'rejected'], default: 'uploaded' }
  }],
  isDemoData: { type: Boolean, default: true }
}, { timestamps: true });

workerSchema.index({ status: 1 });
workerSchema.index({ cooperativeId: 1 });
workerSchema.index({ 'skills.name': 1 });
workerSchema.index({ 'serviceArea.district': 1 });
workerSchema.index({ 'availability.isAvailableNow': 1 });

module.exports = mongoose.model('Worker', workerSchema);
