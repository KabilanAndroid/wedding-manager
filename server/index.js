// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: "Wedding Logistics API is running!" });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then start the server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
