const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function verifyToken (req, res, next) {
  const token = req.headers['x-access-token'];
  if(!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided'
    });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.body.userId = decoded.id;
    } catch (error) {
      res.send('No valid token')
    }
    next();
  }
}

module.exports = verifyToken;