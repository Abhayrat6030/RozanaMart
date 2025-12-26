const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    image: String,
  }],
  deliveryAddress: {
    name: String,
    phone: String,
    address: String,
    lat: Number,
    lng: Number,
  },
  amounts: {
    subtotal: {
      type: Number,
      required: true,
    },
    delivery: {
      type: Number,
      required: true,
    },
    advance: {
      type: Number,
      required: true,
    },
    cod: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'advance_paid', 'completed'],
    default: 'pending',
  },
  advancePaid: {
    type: Boolean,
    default: false,
  },
  codPaid: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: String,
  reviewedAt: Date,
  cancelledAt: Date,
  cancelReason: String,
  estimatedDelivery: Date,
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
