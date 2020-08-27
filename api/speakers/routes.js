const { Router } = require('express');
const verifyToken = require('../../utils/verifyToken');
const speakerService = require('./service');
const { validateSpeaker } = require('../../utils/verifiedData');
const router = Router();

function speakerRoutes(app, store) {
  const SpeakerService = speakerService(store)
  app.use('/speakers', router);

  router.post('/:eventId/new', verifyToken, validateSpeaker, SpeakerService.registerSpeaker);
  router.get('/:eventId/', verifyToken, SpeakerService.getAllSpeakers);
  router.get('/:speakerId/get', verifyToken, SpeakerService.getSpeaker);
  router.put('/:speakerId/update', verifyToken, validateSpeaker, SpeakerService.updateSpeaker);
  router.delete('/:speakerId/delete', verifyToken, SpeakerService.deleteSpeaker);
}

module.exports = speakerRoutes;