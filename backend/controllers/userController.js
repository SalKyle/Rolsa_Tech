const db = require('../config/db');  /
const User = db.User; 


const getUserProfile = async (req, res) => {
  try {
    
    const userId = req.user.id;

    
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile };
