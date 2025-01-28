// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import authController

// Correct route handling using the signup and login methods
router.post('/signup', authController.signup); // Calling signup function from authController
router.post('/login', authController.login);   // Calling login function from authController

module.exports = router;

