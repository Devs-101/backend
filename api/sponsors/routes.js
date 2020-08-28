const { Router } = require('express');
const router = Router();

// Middleware
const verifyToken = require('../../utils/verifyToken');
const { validateSponsor } = require('../../utils/verifiedData');

// Services
const sponsorsService = require('./service');

function sponsorRoutes(app, store) {
  const SponsorsService = sponsorsService(store)
  app.use('/sponsors', router);

  router.post('/:eventId/new', verifyToken, validateSponsor, SponsorsService.registerSponsor);
  router.get('/:eventId', verifyToken, SponsorsService.getAllSponsors);
  router.get('/:sponsorId/get', verifyToken, SponsorsService.getSponsor);
  router.put('/:sponsorId/update', verifyToken, validateSponsor, SponsorsService.updateSponsor);
  router.delete('/:sponsorId/delete', verifyToken, SponsorsService.deleteSponsor);
}

module.exports = sponsorRoutes;