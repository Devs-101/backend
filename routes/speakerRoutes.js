const { Router } = require('express');
const router = Router();

// Middleware
const verifyToken = require('../utils/verifyToken');
const { validateSpeaker } = require('../utils/verifiedData');

// Services
const { registerSpeaker, getAllSpeakers, updateSpeaker, deleteSpeaker } = require('../services/speaker.service');

function speakerRoutes(app) {
  app.use('/speakers', router);

  router.post('/:eventId/new', verifyToken, validateSpeaker, registerSpeaker);
  router.get('/:eventId/', verifyToken, getAllSpeakers);
  router.post('/:eventId/update', verifyToken, validateSpeaker, updateSpeaker);
  router.delete('/:eventId/delete', verifyToken, deleteSpeaker);
}

module.exports = speakerRoutes;