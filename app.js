const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
require('dotenv').config();


const app = express();
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
