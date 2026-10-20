// server/admin/scripts/createAdmin.js
// Create an admin account. Run with:
//   npm run create-admin -- admin@example.com "Admin Name" "a-strong-password"
require('dotenv').config({ quiet: true });
const { pool } = require('../../db');
const Admin = require('../models/Admin');

const createAdmin = async ([email, name, password]) => {
  try {
    if (!email || !name || !password) {
      throw new Error('Usage: npm run create-admin -- admin@example.com "Admin Name" "a-strong-password"');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Please enter a valid email');
    if (password.length < 8) throw new Error('Admin password must be at least 8 characters');

    const admin = await Admin.create({ name, email, password });
    console.log(`✅ Admin created: ${admin.name} <${admin.email}> (id ${admin.id})`);
  } catch (error) {
    const message = error.code === 'ER_DUP_ENTRY' ? `An admin with email ${email} already exists` : error.message;
    console.error(`❌ ${message}`);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

createAdmin(process.argv.slice(2));
