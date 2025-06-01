// /middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Expect header: Authorization: Bearer <token>
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Save user id into req.user for controllers to use
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
