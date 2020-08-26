const { Router } = require('express');
const router = Router();

// Middleware
const verifyToken = require('../utils/verifyToken');
const { validateTalk } = require('../utils/verifiedData');

// Services
const { registerTalk, getAllTalks } = require('../services/talk.service');

function talkRoutes(app) {
  app.use('/talks', router);

  router.post('/:eventId/new', verifyToken, validateTalk, registerTalk);
  router.get('/:eventId', verifyToken, getAllTalks);
}

module.exports = talkRoutes;