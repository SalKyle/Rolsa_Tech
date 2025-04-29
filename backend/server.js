require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

require('./models/userModel');
require('./config/initDB');

const app = express();

// Configure CORS to allow requests from your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/api/chargers', require('./routes/chargers'));
app.use('/api/energy', require('./routes/energy'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/cf', require('./routes/cf'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    // Routes all requests that aren't to the API to the React app
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }
  });
} else {
  // Simple health check for development
  app.get('/', (req, res) => {
    res.send('Welcome to the ROLSA Technologies API - Development Mode');
  });
}

// Log database connection status
console.log('Database connected:', db !== null);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});