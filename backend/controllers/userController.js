const getUserProfile = (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT * FROM users WHERE id = ?';
  db.get(query, [userId], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ user });
  });
};

module.exports = { getUserProfile };
