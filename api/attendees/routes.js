const { Router } = require('express');
const router = Router();

const verifyToken = require('../../utils/verifyToken');
const { valideAttendees } = require('../../utils/verifiedData')

const attendeesService = require('./service')

function attendeesRoutes(app, store) {
  const AttendeesService = attendeesService(store)

  app.use('/attendees', router);

  router.post('/:eventId/', valideAttendees, AttendeesService.registerAttendees);
  router.get('/:eventId/', verifyToken, AttendeesService.getAllAttendees);

}

module.exports = attendeesRoutes;