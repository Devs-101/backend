const { Router } = require('express');
const router = Router();

const authService = require('./service');
const {validateUser, valideLogin} = require('../../utils/verifiedData');
const verifyToken = require('../../utils/verifyToken');

function authRoutes(app, store) {
  const AuthService = authService(store)
  app.use('/auth', router);

  router.post('/register', validateUser, AuthService.register);
  router.post('/login', valideLogin, AuthService.login);
  router.post('/me', verifyToken, AuthService.me);

}

module.exports = authRoutes;