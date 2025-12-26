const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Submit review
router.post('/:orderId/review', async (req, res) => {
  try {
    const { rating, review } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        rating,
        review: review || '',
        reviewedAt: new Date()
      },
      { new: true }
    );
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews for product
router.get('/product/:productId', async (req, res) => {
  try {
    const orders = await Order.find({
      'items.product': req.params.productId,
      review: { $exists: true, $ne: null }
    }).select('rating review reviewedAt');
    
    res.json({ success: true, reviews: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
