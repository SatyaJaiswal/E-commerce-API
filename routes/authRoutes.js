const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body; 
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
    const user = new User({ 
      username, 
      password, 
      role: role || 'user'
    });
    
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  });


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
  
});

module.exports = router;
