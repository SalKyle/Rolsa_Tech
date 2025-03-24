const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect the profile route with the authMiddleware
router.get('/user', authMiddleware, getUserProfile);


module.exports = router;
