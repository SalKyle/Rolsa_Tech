const db = require('../config/db');

// GET user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      db.get("SELECT id, name, email FROM users WHERE id = ?", [req.user.id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      user: { 
        id: user.id, 
        username: user.name,
        email: user.email 
      } 
    });
    
  } catch (err) {
    console.error('Error fetching user profile:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    await new Promise((resolve, reject) => {
      db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.user.id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
