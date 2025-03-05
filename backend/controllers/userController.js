const db = require('../config/db');  // Assuming you're using Sequelize or another ORM
const User = db.User; // Adjust this depending on how your database models are set up

// Controller for fetching user profile
const getUserProfile = async (req, res) => {
  try {
    // Extract user ID from decoded JWT
    const userId = req.user.id;

    // Fetch user from DB based on userId
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back user details
    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      // Add any other user details you need
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile };
