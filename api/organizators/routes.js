const { Router } = require('express');
const verifyToken = require('../../utils/verifyToken');
const organizatorService = require('./service');
const { validateOrganizator } = require('../../utils/verifiedData');
const router = Router();

function organizatorRoutes(app, store) {
  const OrganizatorService = organizatorService(store)
  app.use('/organizators', router);

  router.post('/:eventId/new', verifyToken, validateOrganizator, OrganizatorService.registerOrganizator);
  router.get('/:eventId/', verifyToken, OrganizatorService.getAllOrganizators);
  router.get('/:organizatorId/get', verifyToken, OrganizatorService.getOrganizator);
  router.put('/:organizatorId/update', verifyToken, validateOrganizator, OrganizatorService.updateOrganizator);
  router.delete('/:organizatorId/delete', verifyToken, OrganizatorService.deleteOrganizator);
}

module.exports = organizatorRoutes;