// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// Shape sent to the client (matches AuthResponse in client/src/api/ResponseDataType.ts)
const authResponse = (user) => ({
  token: signToken(user),
  user: {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
  },
});

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = await User.create({ name, email, phone, password });
    res.status(201).json(authResponse(user));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)[0].message;
      return res.status(400).json({ message });
    }
    console.error('Register error:', error);
    res.status(500).json({ message: 'Could not create account' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    user.lastLogin = new Date();
    await user.save();
    res.json(authResponse(user));
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Could not log in' });
  }
};

module.exports = { register, login };
