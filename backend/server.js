// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Import the function


// Initialize the app and middleware
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// API routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Initialize DB connection
db(); // Call the function to get the db instance

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
