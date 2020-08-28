const { Router } = require('express');
const router = Router();

const verifyToken = require('../../utils/verifyToken');
const { validateEvent } = require('../../utils/verifiedData');

const eventsService = require('./service');

function eventRoutes(app, store) {
  const EventsService = eventsService(store)
  app.use('/events', router);

  router.post('/:organizationId/new', verifyToken, validateEvent, EventsService.registerEvent);
  router.get('/:organizationId/', verifyToken, EventsService.getAllEvents);
  router.get('/:eventId/get', verifyToken, EventsService.getEvent);
  router.put('/:eventId/update', verifyToken, validateEvent, EventsService.updateEvent);
  router.get('/:eventId/publish', verifyToken, EventsService.publish);
  router.delete('/:eventId/', verifyToken, EventsService.erase);
}

module.exports = eventRoutes;