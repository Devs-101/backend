const { Router } = require('express');
const router = Router();

const attendeesService = require('../../services/attendees.service')

function attendeesRoutes(app, store) {
  const AttendeesService = attendeesService(store)

  app.use('/attendees', router);

  router.post('/', AttendeesService.createAttendees);
  router.get('/', AttendeesService.readAllAttendees);

}

module.exports = attendeesRoutes;