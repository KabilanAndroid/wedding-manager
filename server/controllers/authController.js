// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// Shape sent to the client (matches AuthResponse in client/src/api/ResponseDataType.ts)
const authResponse = (user) => ({
  token: signToken(user),
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  },
});

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const invalid = User.validate({ name, email, phone, password });
  if (invalid) {
    return res.status(400).json({ message: invalid });
  }
  try {
    const user = await User.create({ name, email, phone, password });
    res.status(201).json(authResponse(user));
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'An account with this email already exists' });
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
    const user = await User.findByEmail(email);
    if (!user || !(await User.comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    await User.updateLastLogin(user.id);
    res.json(authResponse(user));
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Could not log in' });
  }
};

module.exports = { register, login };
