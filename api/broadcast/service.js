const response = require('../../utils/responses');

function broadcastService(storeInjection) {
  const controller = require('./controller')

  let store = storeInjection;

  if (!store) store = require('../../__mocks__/broadcast.mocks').Broadcast;

  const Controller = controller(store)
  
  const updateBroadcast = async (req, res) => {
    const { body: data } = req;
    const { params: params } = req;
    
    try {
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
      console.log(error)
    }
  };

  const getBroadcast = async (req, res) => {
    const { params } = req;
    try {
      const broadcast = await Controller.getBroadcast(params.eventId);
      response.success(req, res, broadcast, 200);
    } catch (error) {
      response.error(req, res, error.errors, 400)
    }
  };

  return {
    updateBroadcast,
    getBroadcast
  }
}

module.exports = broadcastService;