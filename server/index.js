// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./admin/routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // admin panel API (server/admin/)

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: "Wedding Logistics API is running!" });
});

const PORT = process.env.PORT || 5000;

// Connect to MySQL, then start the server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
