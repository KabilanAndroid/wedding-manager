// server/admin/controllers/usersController.js
const User = require('../../models/User');

// GET /api/admin/users → every customer (without passwords)
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Could not get users' });
  }
};

module.exports = { getUsers };
