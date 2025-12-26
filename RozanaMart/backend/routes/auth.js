const express = require('express');
const jwt = require('jsonwebtoken');
const FirebaseModels = require('../models/FirebaseModels');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    
    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = await FirebaseModels.getUserByPhone(phone);
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Phone number already registered' });
    }
    
    const referralCode = 'ROZANA' + phone.slice(-4);
    
    // Create user in Firebase
    const user = await FirebaseModels.createUser({
      name,
      phone,
      password, // Note: Hash this in production!
      referralCode,
      wallet: 0,
      isBlocked: false,
    });
    
    const token = jwt.sign(
      { userId: user.id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        referralCode: user.referralCode,
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    if (!phone || !password) {
      return res.status(400).json({ success: false, error: 'Phone and password required' });
    }
    
    const user = await FirebaseModels.getUserByPhone(phone);
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    if (user.isBlocked) {
      return res.status(403).json({ success: false, error: 'Account blocked' });
    }
    
    const token = jwt.sign(
      { userId: user.id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        referralCode: user.referralCode,
        wallet: user.wallet || 0,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify Token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await FirebaseModels.getUserById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

module.exports = router;
