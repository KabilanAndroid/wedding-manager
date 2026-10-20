// server/admin/controllers/authController.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (admin) =>
  jwt.sign({ id: admin.id }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: process.env.ADMIN_JWT_EXPIRES_IN || '1d',
  });

// POST /api/admin/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const admin = await Admin.findByEmail(email);
    if (!admin || !(await Admin.comparePassword(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    await Admin.updateLastLogin(admin.id);
    res.json({
      token: signToken(admin),
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Could not log in' });
  }
};

module.exports = { login };
