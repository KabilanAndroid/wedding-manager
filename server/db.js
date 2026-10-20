// server/db.js
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Aiven only accepts SSL connections, verified with the CA certificate from the Aiven console
const caPath = path.resolve(__dirname, process.env.MYSQL_SSL_CA || 'config/ca.pem');

// A pool keeps a few connections open and reuses them for every query
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: fs.existsSync(caPath) ? { ca: fs.readFileSync(caPath) } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
});

// Run every .sql file in database/migrations, in name order (001_, 002_, ...).
// Each file uses "IF NOT EXISTS", so running them again on every start is safe.
const runMigrations = async () => {
  const dir = path.join(__dirname, 'database', 'migrations');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    await pool.query(fs.readFileSync(path.join(dir, file), 'utf8'));
  }
};

const connectDB = async () => {
  if (!fs.existsSync(caPath)) {
    console.error(`❌ SSL certificate not found at ${caPath}`);
    console.error('   Download "CA certificate" from your Aiven MySQL service and save it there.');
    process.exit(1);
  }
  try {
    await pool.query('SELECT 1');
    console.log(`✅ Connected to MySQL: ${process.env.MYSQL_HOST}`);
    await runMigrations();
  } catch (error) {
    console.error(`❌ MySQL Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
