require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/db');
const corsmid =  require('./middleware/corsmiddleware');

require('./models/userModel');
require('./config/initDB');

const app = express();

// CRITICAL: Add custom CORS headers to solve cross-origin problems
// THIS MUST BE BEFORE ALL OTHER MIDDLEWARE
app.use((req, res, next) => {
  // Allow requests from your frontend domain
  res.header('Access-Control-Allow-Origin', 'https://rolsa-tech-ea9t.onrender.com');
  
  // Allow credentials (cookies, auth headers)
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Allow these methods 
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  
  // Allow these headers
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Parse JSON request bodies
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api/chargers', require('./routes/chargers'));
app.use('/api/energy', require('./routes/energy'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/cf', require('./routes/cf'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Simple health check or welcome endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the ROLSA Technologies API');
});

// CORS test endpoint for debugging
app.get('/cors-test', (req, res) => {
  res.json({ message: "CORS is working correctly!", timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

console.log('Database connected:', db !== null);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS is configured to allow requests from rolsa-tech-ea9t.onrender.com`);
});