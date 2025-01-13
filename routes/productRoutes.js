const express = require('express');
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get a product by ID
router.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Add a new product (Admin only)
router.post('/products', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, description, price, stock } = req.body;
  const newProduct = new Product({ name, description, price, stock });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// Update a product (Admin only)
router.put('/products/:name', authMiddleware, adminMiddleware, async (req, res) => {
    const { name, description, price, stock } = req.body;
    
    // Use findOneAndUpdate to update by name instead of _id
    const updatedProduct = await Product.findOneAndUpdate(
      { name: req.params.name }, 
      { name, description, price, stock }, 
      { new: true } 
    );
    
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    
    res.json(updatedProduct);
  });
  
// Delete a product (Admin only)
router.delete('/products/:name', authMiddleware, adminMiddleware, async (req, res) => {
    const { name } = req.params;
  
    // Find the product by name and delete it
    const deletedProduct = await Product.findOneAndDelete({ name });
  
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
  
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  });
  

module.exports = router;
