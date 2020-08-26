const { Router } = require('express');
const router = Router();

// Middleware
const verifyToken = require('../utils/verifyToken');
const { validateSponsor } = require('../utils/verifiedData')

// Services
const { registerSponsor, getAllSponsors, deleteSponsor } = require('../services/sponsor.service')

function sponsorRoutes(app) {
  app.use('/sponsors', router);

  router.post('/:eventId/new', verifyToken, validateSponsor, registerSponsor);
  router.get('/:eventId', verifyToken, getAllSponsors);
  router.delete('/:eventId/delete', verifyToken, deleteSponsor);
}

module.exports = sponsorRoutes;