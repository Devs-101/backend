const { Router } = require('express');
const router = Router();

const { register, login, me } = require('../services/auth.service')

function authRoutes(app) {
  app.use('/auth', router);

  router.post('/register', register);
  router.post('/login', login);
  router.post('/me', me);

}

module.exports = authRoutes;