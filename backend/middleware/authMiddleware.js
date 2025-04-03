const jwt = require('jsonwebtoken');
const db = require('../config/db');



const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(' ')[1]; 
    // console.log('Received Token:', token); 
    // console.log('🧾 JWT_SECRET in middleware:', process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the extracted token

    // Fetch user from DB using decoded user ID
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [decoded.id], (err, user) => {
      if (err) {
        console.error('Database Error:', err); // Debugging log
        return res.status(500).json({ message: 'Database error' });
      }
      if (!user) return res.status(401).json({ message: 'User not found' });

      req.user = user; // Attach user to request object
      next();
    });

  } catch (error) {
    console.error('Token Verification Error:', error); // Debugging log
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
