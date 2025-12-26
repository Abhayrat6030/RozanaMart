const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address: {
    type: String,
    default: '',
  },
  lat: {
    type: Number,
    default: 28.6139,
  },
  lng: {
    type: Number,
    default: 77.2090,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  cancelledOrders: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
