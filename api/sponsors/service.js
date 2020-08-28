const response = require('../../utils/responses');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const { defaultImages } = require('../../utils/defaultImages');

function sponsorService(storeInjection) {
  const controller = require('./controller');
  const events = require('../events/controller');

  let store = storeInjection;
  let eventsStore = require('../../models/Events');

  if (!store) {
    eventsStore = require('../../__mocks__/events.mocks').Events;
    store = require('../../__mocks__/sponsors.mocks').Sponsors;
  }

  const Controller = controller(store);
  const Events = events(eventsStore);

  const registerSponsor = async (req, res, next) => {
    const { body: data, params, file } = req;

    try {
      const findEvent = await Events.getEvent(params.eventId)
      if(!findEvent) response.error(req, res, [{
        value: data.name,
        msg: 'Event doesnt exist',
        param: 'name'
        }], 400);

      data.eventId = findEvent._id;

      data.img = defaultImages.sponsor;
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }

      const newSponsor = await Controller.registerSponsor(data);

      if(!newSponsor) response.error(req, res, [ 'NO_SAVE_SPONSOR' ], 403);

      response.success(req, res, newSponsor, 201)

    } catch (error) {
      return error
    }
  };

  const getAllSponsors = async (req, res, next) => {
    if(!req.params.eventId) response.error(req, res, [ 'INCORRECT_EVENT_ID' ], 403);
    try {
      const sponsors = await Controller.getSponsors(req.params.eventId);
      response.success(req, res, sponsors, 200);
    } catch (error) {
          next(res.send({error: [{
            value: req.params.eventId,
            msg: 'Incorrect data error',
            param: 'eventId'
      }]}))
    }
  }

  const getSponsor = async (req, res, next) => {
    try {
      const sponsors = await Controller.getSponsor(req.params.sponsorId);
  
      response.success(req, res, sponsors, 200);
    } catch (error) {
        next(res.send({error: [{
            value: req.params.sponsorId,
            msg: 'Incorrect data error',
            param: 'sponsorId'
      }]}))
    }
  }

  const updateSponsor = async (req, res) => {
    const { body: data, file, params } = req;
  
    try {
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }

      const sponsor = await Controller.updateSponsor(params.sponsorId, data);
      if(!sponsor) response.error(req, res, [ 'ERROR_ON_UPDATE_SPONSOR' ], 400);

      response.success(req, res, sponsor, 200);
    } catch (error) {
      response.error(req, res, [ 'ERROR_UPDATE_SPONSOR' ], 403);
    }
  }

  const deleteSponsor = async (req, res) => {
    if(!req.params.sponsorId) response.error(req, res, [ 'SEND_SPONSOR_ID' ], 403);
    
    try {
      const deleted = await Controller.deleteSponsor(req.params.sponsorId);
      if (deleted < 1) response.error(req, res, [ 'CANT_DELETE_SPONSOR' ], 403);

      response.success(req, res, [ 'DELETED' ], 200)
    } catch (error) {
      response.error(req, res, [ 'CANT_DELETE_SPONSOR' ], 403);
    }
  }

  return {
    registerSponsor,
    getAllSponsors,
    getSponsor,
    updateSponsor,
    deleteSponsor
  }
}

module.exports = sponsorService;
