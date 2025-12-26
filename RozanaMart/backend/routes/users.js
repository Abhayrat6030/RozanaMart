const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.patch('/:id', async (req, res) => {
  try {
    const { name, email, address, lat, lng } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, address, lat, lng },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get wallet balance
router.get('/:id/wallet', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ success: true, wallet: user.wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
