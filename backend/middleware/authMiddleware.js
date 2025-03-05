const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // Log the token to check if it's coming through

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);  // Log the error for better debugging
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;
