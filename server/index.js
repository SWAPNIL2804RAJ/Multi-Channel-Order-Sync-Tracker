const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://multi-channel-order-sync-tracker-uc.vercel.app',         // Replacing with frontend URL so that it could connect to only this URL
}));
app.use(express.json());

// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running !');
});

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    console.log('Connected to MongoDB Atlas ✅');
    app.listen(process.env.PORT, () => {
      console.log(` Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
