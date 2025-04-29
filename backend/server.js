require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

require('./models/userModel');
require('./config/initDB');

const app = express();

// CORS configuration - UPDATED to fix the cross-origin issues
app.use(cors({
  origin: [
    'https://rolsa-tech-ea9t.onrender.com',  // Your frontend domain
    'http://localhost:3000'                  // Local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// API routes
app.use('/api/chargers', require('./routes/chargers'));
app.use('/api/energy', require('./routes/energy'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/cf', require('./routes/cf'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Catch-all route for API 404s
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Simple health check or welcome endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the ROLSA Technologies API');
});

console.log('Database connected:', db !== null);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});