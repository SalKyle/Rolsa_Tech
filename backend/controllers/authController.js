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


module.exports = {
  signup,
  login,
};
