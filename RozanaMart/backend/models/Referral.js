const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  reward: {
    type: Number,
    default: 100, // ₹100 bonus
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  redeemedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Referral', referralSchema);
