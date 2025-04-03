const express = require('express');
const router = express.Router();
const { signup, login, googleLogin } = require('../controllers/authController');

// Sign Up and Login routes
router.post('/signup', signup);
router.post('/login', login);

// Google Sign-In route
router.post('/google-login', googleLogin);  

module.exports = router;
