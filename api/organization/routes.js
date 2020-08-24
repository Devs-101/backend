const { Router } = require('express');
const router = Router();

const organizationService = require('../../services/attendees.service')

function organizationRoutes(app, store) {
  const OrganizationsService = organizationService(store)

  app.use('/attendees', router);

  router.post('/', OrganizationsService.createAttendees);
  router.get('/', OrganizationsService.readAllAttendees);

}

module.exports = organizationRoutes;