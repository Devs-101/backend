const response = require('../../utils/responses');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const { defaultImages } = require('../../utils/defaultImages');

function organizatorService(storeInjection) {
  const controller = require('./controller');
  const events = require('../events/controller');

  let store = storeInjection;
  let eventsStore = require('../../models/Events');

  if(!store) {
    eventsStore = require('../../__mocks__/events.mocks').Events;
    store = require('../../__mocks__/organizators.mocks').Organizators;
  }

  const Controller = controller(store);
  const Events = events(eventsStore);

  const registerOrganizator = async (req, res, next) => {
    const { body: data, params, file } = req;

    try {
      const findEvent = await Events.getEvent(params.eventId)
      if(!findEvent) response.error(req, res, [{
        value: data.name,
        msg: 'Event doesnt exist',
        param: 'eventId'
        }], 400);

      data.eventId = findEvent._id;
      data.img = defaultImages.organizators;
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }

      const newOrganizator = await Controller.registerOrganizator(data);

      if(!newOrganizator) response.error(req, res, [ 'NO_SAVE_ORGANIZATOR' ], 403);

      response.success(req, res, newOrganizator, 201)

    } catch (error) {
      next(error)
    }
  }

  const getAllOrganizators = async (req, res, next) => {
    if(!req.params.eventId) response.error(req, res, [ 'INCORRECT_EVENT_ID' ], 403);

    try {
      const organizators = await Controller.getOrganizators(req.params.eventId)
  
      if (!organizators) response.error(req, res, [ 'NO_ORGANIZATORS' ], 400);
      response.success(req, res, organizators, 200);
    } catch (error) {
      next(error)
    }
  }

  const getOrganizator = async (req, res, next) => {
    try {
      const organizator = await Controller.getOrganizator(req.params.organizatorId);
  
      if (!organizator) response.error(req, res, [ 'NO_SPEAKERS' ], 400);
      response.success(req, res, organizator, 200);
    } catch (error) {
        next(error)
    }
  }

  const updateOrganizator = async (req, res, next) => {
    const { body: data, file, params } = req;
  
    try {
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }

      const organizator = await Controller.updateOrganizator(params.organizatorId, data);
      if(!organizator) response.error(req, res, [ 'ERROR_ON_UPDATE_ORGANIZATOR' ], 400);

      response.success(req, res, organizator, 200);
    } catch (error) {
      next(error)
    }
  }

  const deleteOrganizator = async (req, res, next) => {
    if(!req.params.organizatorId) response.error(req, res, [ 'SEND_ORGANIZATOR_ID' ], 403);
    
    try {
      const deleted = await Controller.deleteOrganizator(req.params.organizatorId);
      if (deleted < 1) response.error(req, res, [ 'CANT_DELETE_ORGANIZATOR' ], 403);

      response.success(req, res, [ 'DELETED' ], 200)
    } catch (error) {
      next(error)
    }
  }

  return {
    registerOrganizator,
    getAllOrganizators,
    getOrganizator,
    updateOrganizator,
    deleteOrganizator
  }
};

module.exports = organizatorService