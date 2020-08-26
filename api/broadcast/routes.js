const { Router } = require('express');
const verifyToken = require('../../utils/verifyToken');
const broadcastService = require('./service');
const { validateBroadcast } = require('../../utils/verifiedData');
const router = Router();

function broadcastRoutes(app, store) {
  const BroadcastService = broadcastService(store)
  app.use('/broadcast', router);

  router.put('/:eventId/update', verifyToken, validateBroadcast, BroadcastService.updateBroadcast);
  router.get('/:eventId/get', verifyToken, BroadcastService.getBroadcast);
}

module.exports = broadcastRoutes;