const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['payment_dispute', 'unfair_rating', 'safety_issue', 'account_issue', 'service_quality'],
    required: true
  },
  description: { type: String, required: true },
  evidenceUrls: [{ type: String }],
  status: {
    type: String,
    enum: ['open', 'in_review', 'resolved', 'escalated', 'closed'],
    default: 'open'
  },
  assignedAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  resolutionNote: { type: String, default: null }
}, { timestamps: true });

grievanceSchema.index({ raisedBy: 1 });
grievanceSchema.index({ status: 1 });
grievanceSchema.index({ type: 1 });

module.exports = mongoose.model('Grievance', grievanceSchema);
