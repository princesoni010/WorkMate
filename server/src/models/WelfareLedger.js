const mongoose = require('mongoose');

const welfareLedgerSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cooperativeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cooperative' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], default: 'credit' },
  description: { type: String },
}, { timestamps: true });

welfareLedgerSchema.index({ workerId: 1 });
welfareLedgerSchema.index({ cooperativeId: 1 });

module.exports = mongoose.model('WelfareLedger', welfareLedgerSchema);
