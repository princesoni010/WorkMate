const mongoose = require('mongoose');

const cooperativeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['society', 'federation'], required: true },
  parentFederationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cooperative', default: null },
  state: { type: String, required: true },
  district: { type: String, required: true },
  publicReference: { type: String, default: null },
  adminUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isDemoData: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Cooperative', cooperativeSchema);
