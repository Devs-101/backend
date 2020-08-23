const { Router } = require('express');
const router = Router();

const { register, login, me } = require('../services/auth.service');
const {validateUser, valideLogin} = require('../utils/verifiedData');
const verifyToken = require('../utils/verifyToken');

function authRoutes(app) {
  app.use('/auth', router);

  router.post('/register', validateUser, register);
  router.post('/login', valideLogin, login);
  router.post('/me', verifyToken, me);

}

module.exports = authRoutes;