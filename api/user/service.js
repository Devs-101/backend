const response = require('../../utils/responses');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const { defaultImages } = require('../../utils/defaultImages');

function userService(storeInjection) {
  const controller = require('./controller');

  let store = storeInjection;
  
  if(!store) store = require('../../__mocks__/users.mocks').Users;

  const Controller = controller(store);

  const getUser = async(req, res, next) => {
    try {
      const user = await Controller.getUser(req.params.userId);

      if(!user) response.error(req, res, [ 'NO_USER' ], 400);
      response.success(req, res, user, 200);
    } catch (error) {
      next(error);
    }
  };

  const updateUser = async(req, res, next) => {
    const { body: data, file, params } =req;
    
    data.img = defaultImages.users;
    try {
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }

      const user = await Controller.updateUser(params.userId, data);
      if(!user) response.error(req, res, [ 'ERROR_ON_UPDATE_USER'], 400);

      response.success(req, res, user, 200);
    } catch (error) {
      next(error);
    }
  };

  return {
    getUser,
    updateUser
  }
};

module.exports = userService;