const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(' ')[1]; // Extract token correctly

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the extracted token

    // Fetch user from DB using decoded user ID
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [decoded.id], (err, user) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (!user) return res.status(401).json({ message: 'User not found' });

      req.user = user; // Attach user to request object
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;