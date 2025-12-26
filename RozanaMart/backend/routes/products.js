const express = require('express');
const FirebaseModels = require('../models/FirebaseModels');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let products = await FirebaseModels.getAllProducts();
    
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await FirebaseModels.getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create product (Admin only)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, stock, image, description, mrp, discount, weight, unit } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ success: false, error: 'Required fields missing' });
    }

    const product = await FirebaseModels.createProduct({
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      image: image || '',
      description: description || '',
      mrp: parseFloat(mrp) || price,
      discount: parseInt(discount) || 0,
      weight: weight || '',
      unit: unit || '',
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await FirebaseModels.updateProduct(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await FirebaseModels.updateProduct(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Get bestsellers
router.get('/category/bestsellers', async (req, res) => {
  try {
    const bestsellers = await Product.find({ isActive: true })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(10);
    
    res.json({ success: true, products: bestsellers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
