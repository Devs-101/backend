const { Router } = require('express');
const router = Router();

const verifyToken = require('../../utils/verifyToken');
const { validateUpdateUser } = require('../../utils/verifiedData');

const usersService = require('./service');

function userRoutes(app, store) {
  const UsersService = usersService(store)
  app.use('/users', router);

  router.get('/:userId/get', verifyToken, UsersService.getUser);
  router.put('/:userId/update', verifyToken, validateUpdateUser, UsersService.updateUser);

};


module.exports = userRoutes;