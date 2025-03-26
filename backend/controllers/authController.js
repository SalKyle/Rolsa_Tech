const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('205487692902-fjbc0imr8k3ons2lnf1k2ku2msnsmmfm.apps.googleusercontent.com');
const bcrypt = require('bcrypt');
const e = require('cors');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();


const SECRET_KEY = 'rolsa_secret_key';
const db = require('../config/db');


const generateToken = (id, email) => {
  return jwt.sign({ id, email }, SECRET_KEY, { expiresIn: '1d' });
};


const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Incoming signup:', req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name.trim(), email.trim(), hashedPassword],
      function (err) {
        if (err) {
          console.error('DB Error on signup:', err.message); // 🔍 Log the actual error
          return res.status(400).json({ error: err.message });
        }

        const token = generateToken(this.lastID, email);
        res.status(201).json({ message: 'User registered successfully', token });
      }
    );
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ error: 'Signup failed' });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.email);
    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
};


// Google login handler
const googleLogin = async (req, res) => {
  const { token } = req.body; // The JWT received from the frontend

  try {
    // Verify the JWT sent from Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '205487692902-fjbc0imr8k3ons2lnf1k2ku2msnsmmfm.apps.googleusercontent.com', // Your Google Client ID
    });

    const payload = ticket.getPayload(); // Extract user data from the JWT
    const { sub: googleId, name, email } = payload; // Extract necessary details

    // Check if the user already exists in your DB
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (user) {
        // User already exists, generate a JWT token and return it
        const jwtToken = generateToken(user.id, user.email);
        return res.status(200).json({
          message: 'User logged in successfully',
          user: { id: user.id, name: user.name, email: user.email },
          token: jwtToken,
        });
      } else {
        // User doesn't exist, create a new user in your DB
        const hashedPassword = await bcrypt.hash(googleId, 10); // Using Google ID as a "password"

        db.run(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({ message: 'Error creating user', error: err });
            }

            const jwtToken = generateToken(this.lastID, email); // Generate JWT for the new user
            res.status(201).json({
              message: 'User created and logged in successfully',
              user: { id: this.lastID, name, email },
              token: jwtToken,
            });
          }
        );
      }
    });
  } catch (error) {
    console.error('Google Login Error:', error);
    res.status(400).json({ message: 'Invalid Google token', error: error.message });
  }
};

// Export the functions
module.exports = {
  signup,
  login,
  googleLogin, // Export the Google Login function
};
