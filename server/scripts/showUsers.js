// server/scripts/showUsers.js
// Print every signed-up user (without passwords). Run with: npm run users
require('dotenv').config({ quiet: true });
const { pool } = require('../db');

const showUsers = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, role, last_login, created_at FROM users ORDER BY id'
    );
    console.log(`${rows.length} user(s) in ${process.env.MYSQL_DATABASE}.users`);
    if (rows.length) console.table(rows);
  } catch (error) {
    console.error(`❌ Could not read users: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

showUsers();
