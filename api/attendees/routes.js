const { Router } = require('express');
const router = Router();

const {
  createAttendees,
  readAllAttendees,
  readAttendees,
  deleteAttendees
} = require('../../services/attendees.service')

function scheduleRoutes(app) {
  app.use('/attendees', router);

  router.post('/', createAttendees);
  router.get('/', readAllAttendees);
  router.get('/:id', readAttendees);
  router.get('/:id/delete', deleteAttendees);

}

module.exports = scheduleRoutes;