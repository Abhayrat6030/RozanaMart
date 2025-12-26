const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const { userId, items, deliveryAddress, amounts } = req.body;
    
    if (!userId || !items || !deliveryAddress || !amounts) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Generate order number
    const orderNumber = 'RM' + Date.now();
    
    // Check stock
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ error: `${item.name} is out of stock` });
      }
    }
    
    const order = new Order({
      orderNumber,
      user: userId,
      items,
      deliveryAddress,
      amounts,
      estimatedDelivery: new Date(Date.now() + 30 * 60000), // 30 mins
    });
    
    // Update stock
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    await order.save();
    
    res.status(201).json({
      success: true,
      order,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('items.product');
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updatedAt: new Date(),
        ...(status === 'delivered' && { deliveredAt: new Date() })
      },
      { new: true }
    );
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pay advance
router.post('/:id/pay-advance', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        advancePaid: true,
        paymentStatus: 'advance_paid',
        updatedAt: new Date()
      },
      { new: true }
    );
    
    res.json({ success: true, order, message: 'Advance payment received' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete order payment (COD)
router.post('/:id/pay-cod', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        codPaid: true,
        paymentStatus: 'completed',
        status: 'delivered',
        updatedAt: new Date()
      },
      { new: true }
    );
    
    res.json({ success: true, order, message: 'COD payment received' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
