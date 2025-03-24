// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Validate that the controller functions exist
if (!authController.signup || !authController.login) {
  console.error("❌ Controller methods not found. Check your 'authController.js' exports.");
} else {
  router.post('/signup', authController.signup);
  router.post('/login', authController.login);
}

module.exports = router;
