// server/models/User.js
const bcrypt = require('bcryptjs');
const { pool } = require('../db');

// Check the sign-up fields; returns an error message, or null when everything is valid
const validate = ({ name, email, phone, password }) => {
  if (!name || !String(name).trim()) return 'Name is required';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email';
  if (!phone || !/^\+?[0-9 ]{10,15}$/.test(phone)) return 'Please enter a valid phone number';
  if (!password || String(password).length < 6) return 'Password must be at least 6 characters';
  return null;
};

const normalizeEmail = (email) => String(email).toLowerCase().trim();

// Returns the full row (including the password hash), or null if no such email
const findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [normalizeEmail(email)]);
  return rows[0] || null;
};

// Hash the password and insert a new user; returns the new user without the password
const create = async ({ name, email, phone, password }) => {
  const hash = await bcrypt.hash(password, 10);
  const user = { name: String(name).trim(), email: normalizeEmail(email), phone: String(phone).trim() };
  const [result] = await pool.query(
    'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [user.name, user.email, user.phone, hash]
  );
  return { id: result.insertId, ...user };
};

// Every user without the password hash, oldest first
const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT id, name, email, phone, last_login, created_at FROM users ORDER BY id'
  );
  return rows;
};

const updateLastLogin = (id) => pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [id]);

// Compare a plain-text password with the stored hash
const comparePassword = (candidatePassword, hash) => bcrypt.compare(candidatePassword, hash);

module.exports = { validate, findByEmail, findAll, create, updateLastLogin, comparePassword };
