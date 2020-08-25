const { Router } = require('express');
const router = Router();
const verifyToken = require('../../utils/verifyToken');
const { validateOrganization } = require('../../utils/verifiedData');

const organizationService = require('./service')

function organizationRoutes(app, store) {
  const OrganizationsService = organizationService(store)

  app.use('/organizations', router);

  router.post('/', verifyToken, validateOrganization, OrganizationsService.register);
  router.get('/', verifyToken, OrganizationsService.readAll);
  router.get('/:organizationId', verifyToken, OrganizationsService.read);
  router.put('/:organizationId', verifyToken, validateOrganization, OrganizationsService.update);
  router.delete('/:organizationId', verifyToken, OrganizationsService.erase);

}

module.exports = organizationRoutes;