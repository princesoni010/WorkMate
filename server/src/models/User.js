const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, sparse: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['customer', 'worker', 'society_admin', 'federation_admin'],
    default: 'customer'
  },
  cooperativeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cooperative', default: null },
  language: { type: String, enum: ['en', 'hi'], default: 'en' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
