const db = require('../config/db');  // Import the db instance directly
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
  const { username, email, password } = req.body;

  // Make sure that all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err); // Log the error to the console
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // SQL query to insert a new user
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    db.run(query, [username, email, hashedPassword], function (err) {
      if (err) {
        console.error('Error inserting user into database:', err); // Log the error to the console
        return res.status(500).json({ message: 'Error inserting user' });
      }
      console.log('User created with ID:', this.lastID); // Log successful creation
      res.status(201).json({ message: 'User created', userId: this.lastID });
    });
  });
};

module.exports = { signup };

