// server/admin/routes/index.js
// Everything under /api/admin
const express = require('express');
const { protectAdmin } = require('../middleware/protectAdmin');
const { login } = require('../controllers/authController');
const { getUsers } = require('../controllers/usersController');

const router = express.Router();

// Public: admin login
router.post('/auth/login', login); // POST /api/admin/auth/login

// Every route below this line needs an admin token
router.use(protectAdmin);

router.get('/users', getUsers); // GET /api/admin/users

module.exports = router;
