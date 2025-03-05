const db = require('../config/db'); // Import the db instance directly
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup function
const signup = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    db.run(query, [username, email, hashedPassword], function (err) {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).json({ message: 'Error inserting user' });
      }
      console.log('User created with ID:', this.lastID);
      res.status(201).json({ message: 'User created', userId: this.lastID });
    });
  });
};

// Login function
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], (err, user) => {
    if (err) {
      console.error('Error fetching user from database:', err);
      return res.status(500).json({ message: 'Error fetching user' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '3h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  });
};

module.exports = { signup, login };
