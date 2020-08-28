const { Router } = require('express');
const router = Router();

// Middleware
const verifyToken = require('../../utils/verifyToken');
const { validateTalk } = require('../../utils/verifiedData');

// Services
const talksService = require('./service');

function talkRoutes(app, store) {
  const TalksService = talksService(store)
  app.use('/talks', router);

  router.post('/:eventId/new', verifyToken, validateTalk, TalksService.registerTalk);
  router.get('/:eventId', verifyToken, TalksService.getAllTalks);
  router.get('/:talkId/get', verifyToken, TalksService.getTalk);
  router.put('/:talkId/update', verifyToken, validateTalk, TalksService.updateTalk);
  router.delete('/:talkId/delete', verifyToken, TalksService.deleteTalk);
}

module.exports = talkRoutes;