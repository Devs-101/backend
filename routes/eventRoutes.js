const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const { registerEvent } = require('../services/event.service');
const { validateEvent } = require('../utils/verifiedData');
const router = Router();



function eventRoutes(app) {
  app.use('/', router);

  router.post('/new', verifyToken, validateEvent, registerEvent);
}

module.exports = eventRoutes;