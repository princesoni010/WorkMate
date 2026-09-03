const jwt = require('jsonwebtoken');

const generateToken = (userId, role, cooperativeId) => {
  return jwt.sign(
    { userId, role, cooperativeId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

module.exports = { generateToken, verifyToken };
