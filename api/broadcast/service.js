const response = require('../../utils/responses');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const { defaultImages } = require('../../utils/defaultImages');

function broadcastService(storeInjection) {
  const controller = require('./controller')

  let store = storeInjection;

  if (!store) store = require('../../__mocks__/broadcast.mocks').Broadcast;

  const Controller = controller(store)
  
  const updateBroadcast = async (req, res, next) => {
    const { body: data, files, params } = req;
    
    try {
      data.img = defaultImages.broadcast;
      if(files) {
        const { img } = files
        if(img) {
          const avatarImg = await cloudinary.v2.uploader.upload(img[0].path);
          data.img = avatarImg.secure_url;
          await fs.unlink(img[0].path);
        }
      }

      const broadcast = await Controller.updateBroadcast(params.eventId, data);
  
      if (broadcast) {
        response.success(req, res, broadcast, 200);
      } else {
        response.error(
          req,
          res,
          [{
            "msg": "Broadcast Id is required",
            "param": "broadcastId"
          }],
          200
        );
      }
    } catch (error) {
      next(error);
    }
  };

  const getBroadcast = async (req, res, next) => {
    const { params } = req;
    try {
      const broadcast = await Controller.getBroadcast(params.eventId);
      response.success(req, res, broadcast, 200);
    } catch (error) {
      next(error);
    }
  };

  return {
    updateBroadcast,
    getBroadcast
  }
}

module.exports = broadcastService;