const { Router } = require('express');
const router = Router();

const {
  createAttendees,
  readAllAttendees,
} = require('../../services/attendees.service')

function scheduleRoutes(app) {
  app.use('/attendees', router);

  router.post('/', createAttendees);
  router.get('/', readAllAttendees);

}

module.exports = scheduleRoutes;