const { Router } = require('express');
const router = Router();
const verifyToken = require('../../utils/verifyToken');
const { validateOrganization } = require('../../utils/verifiedData');

const organizationService = require('./service')

function organizationRoutes(app, store) {
  const OrganizationsService = organizationService(store)

  app.use('/organizations', router);

  router.post('/:userId/new', verifyToken, validateOrganization, OrganizationsService.registerOrganization);
  router.get('/:userId/', verifyToken, OrganizationsService.getAllOrganizations);
  router.get('/:organizationId/get', verifyToken, OrganizationsService.getOrganization);
  router.put('/:organizationId/update', verifyToken, validateOrganization, OrganizationsService.updateOrganization);
  router.delete('/:organizationId/delete', verifyToken, OrganizationsService.deleteOrganization);

}

module.exports = organizationRoutes;