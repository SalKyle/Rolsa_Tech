const express = require('express');
const router = express.Router();
const { signup, login, googleLogin } = require('../controllers/authController'); // Import googleLogin

// Sign Up and Login routes
router.post('/signup', signup);
router.post('/login', login);

// Add the Google login route
router.post('/google-login', googleLogin);  // This route will handle Google Sign-In

module.exports = router;
