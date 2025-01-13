const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get the user's cart
router.get('/cart', authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
  res.json(cart || { products: [] });
});

// Add item to cart by product name
router.post('/cart', authMiddleware, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await Product.findOne({ name });
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const cart = await Cart.findOne({ userId: req.user._id });
  if (cart) {
    const existingProduct = cart.products.find(p => p.productId.toString() === product._id.toString());
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId: product._id, quantity });
    }
    await cart.save();
  } else {
    const newCart = new Cart({ userId: req.user._id, products: [{ productId: product._id, quantity }] });
    await newCart.save();
  }
  res.status(201).json({ message: 'Item added to cart' });
});

// Remove item from cart by product name
router.delete('/cart/:name', authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const product = await Product.findOne({ name: req.params.name });
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const productIndex = cart.products.findIndex(p => p.productId.toString() === product._id.toString());
  if (productIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

  cart.products.splice(productIndex, 1);
  await cart.save();
  res.json({ message: 'Item removed from cart' });
});

module.exports = router;
