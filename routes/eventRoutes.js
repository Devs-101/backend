const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const { registerEvent } = require('../services/event.service');
const { validateEvent } = require('../utils/verifiedData');
const router = Router();

function eventRoutes(app) {
  app.use('/events', router);

  router.post('/:organizationId/new', verifyToken, validateEvent, registerEvent);
  router.get('/:organizationId/', verifyToken, registerEvent);
}

module.exports = eventRoutes;