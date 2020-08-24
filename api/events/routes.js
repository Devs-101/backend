const { Router } = require('express');
const verifyToken = require('../../utils/verifyToken');
const eventsService = require('../../services/event.service');
const { validateEvent } = require('../../utils/verifiedData');
const router = Router();

function eventRoutes(app, store) {
  const EventsService = eventsService(store)
  app.use('/events', router);

  router.post('/:organizationId/new', verifyToken, validateEvent, EventsService.registerEvent);
  router.get('/:organizationId/get', verifyToken, EventsService.readAllEvents);
}

module.exports = eventRoutes;