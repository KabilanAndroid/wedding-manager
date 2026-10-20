// server/admin/middleware/protectAdmin.js
const jwt = require('jsonwebtoken');

// Only let the request through with a valid ADMIN token.
// Admin tokens are signed with ADMIN_JWT_SECRET, so a customer token never passes.
const protectAdmin = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: 'Please log in as an admin' });
  }
  try {
    req.admin = jwt.verify(token, process.env.ADMIN_JWT_SECRET); // { id } from signToken
    next();
  } catch {
    res.status(401).json({ message: 'Admin session expired, please log in again' });
  }
};

module.exports = { protectAdmin };
