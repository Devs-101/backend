const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const { registerEvent } = require('../services/event.service');
const router = Router();



function eventRoutes(app) {
  app.use('/event', router);

  router.post('/newEvent', verifyToken, registerEvent);
}

module.exports = eventRoutes;