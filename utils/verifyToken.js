const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const response = require('./responses')

function verifyToken (req, res, next) {
  const token = req.headers['x-access-token'];
  if(!token) {
    response.error(req, res, 'NO TOKEN PROVIDEN', 401)
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.body.userId = decoded.id;
      next();
    } catch (error) {
      response.error(req, res, 'INVALID TOKEN', 401)
    }
  }
}

module.exports = verifyToken;