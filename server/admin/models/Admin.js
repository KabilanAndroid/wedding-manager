// server/admin/models/Admin.js
const bcrypt = require('bcryptjs');
const { pool } = require('../../db');

const normalizeEmail = (email) => String(email).toLowerCase().trim();

// Returns the full row (including the password hash), or null if no such email
const findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [normalizeEmail(email)]);
  return rows[0] || null;
};

// Hash the password and insert a new admin; returns the new admin without the password
const create = async ({ name, email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  const admin = { name: String(name).trim(), email: normalizeEmail(email) };
  const [result] = await pool.query('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)', [
    admin.name,
    admin.email,
    hash,
  ]);
  return { id: result.insertId, ...admin };
};

const updateLastLogin = (id) => pool.query('UPDATE admins SET last_login = NOW() WHERE id = ?', [id]);

// Compare a plain-text password with the stored hash
const comparePassword = (candidatePassword, hash) => bcrypt.compare(candidatePassword, hash);

module.exports = { findByEmail, create, updateLastLogin, comparePassword };
