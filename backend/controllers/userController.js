const User = require('../models/User');

// Test controller function
const getUsers = async (req, res) => {
  try {
    res.json({ message: 'User controller working!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers
};