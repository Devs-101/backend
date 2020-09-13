const { Router } = require('express');
const router = Router();

const verifyToken = require('../../utils/verifyToken');
const { validateEvent, validateEventPublish } = require('../../utils/verifiedData');

const eventsService = require('./service');

function eventRoutes(app, store) {
  const EventsService = eventsService(store)
  app.use('/events', router);

  router.post('/:organizationId/new', verifyToken, validateEvent, EventsService.registerEvent);
  router.get('/:organizationId/', verifyToken, EventsService.getAllEvents);
  router.get('/:eventId/get', verifyToken, EventsService.getEvent);
  router.get('/:eventId/get-published', verifyToken, EventsService.getPublishedEvent);
  router.put('/:eventId/update', verifyToken, validateEvent, EventsService.updateEvent);
  router.patch('/:eventId/update', verifyToken, validateEvent, EventsService.updateEvent);
  router.post('/:eventId/publish', verifyToken, validateEventPublish, EventsService.publish);
  router.get('/:eventId/ready-for-publish', verifyToken, EventsService.readyForPublish);
  router.delete('/:eventId/delete', verifyToken, EventsService.erase);
}

module.exports = eventRoutes;