const { Router } = require('express');
const router = Router();

// Middleware
const verifyToken = require('../utils/verifyToken');
const { validateSpeaker } = require('../utils/verifiedData');

// Services
const { registerSpeaker, getAllSpeakers } = require('../services/speaker.service');

function speakerRoutes(app) {
  app.use('/speakers', router);

  router.post('/:eventId/new', verifyToken, validateSpeaker, registerSpeaker);
  router.get('/:eventId/', verifyToken, getAllSpeakers);
}

module.exports = speakerRoutes;