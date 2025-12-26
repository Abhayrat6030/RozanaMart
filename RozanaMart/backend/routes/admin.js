const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express.Router();

// Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Mock admin auth
  if (username === 'admin' && password === 'admin123') {
    res.json({
      success: true,
      token: 'admin-token',
      admin: { id: 1, username: 'admin' }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: { $in: ['pending', 'confirmed', 'packed'] } });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    const revenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$amounts.total' } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        deliveredOrders,
        revenue: revenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (admin)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user')
      .limit(50);
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product (admin)
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (admin)
router.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Block/Unblock user
router.patch('/users/:id/block', async (req, res) => {
  try {
    const { isBlocked } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
