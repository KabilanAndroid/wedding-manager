// server/middleware/auth.js
const jwt = require('jsonwebtoken');

// Only let the request through if it has a valid customer login token.
// The client sends it as:  Authorization: Bearer <token>
// Use it on customer routes, e.g. router.get('/my-bookings', protect, getMyBookings)
const protect = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: 'Please log in first' });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id } from signToken
    next();
  } catch {
    res.status(401).json({ message: 'Session expired, please log in again' });
  }
};

module.exports = { protect };
