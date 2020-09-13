const response = require('../../utils/responses');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const { defaultImages } = require('../../utils/defaultImages')

function speakerService(storeInjection) {
  const controller = require('./controller');
  const events = require('../events/controller');

  let store = storeInjection;
  let eventsStore = require('../../models/Events');

  if (!store) {
    eventsStore = require('../../__mocks__/events.mocks').Events;
    store = require('../../__mocks__/speakers.mocks').Speakers;
  }

  const Controller = controller(store);
  const Events = events(eventsStore);
  
  const registerSpeaker = async (req, res, next) => {
    const { body: data, params, files } = req;

    try {
      const findEvent = await Events.getEvent(params.eventId)
      if(!findEvent) response.error(req, res, [{
        value: data.name,
        msg: 'Event doesnt exist',
        param: 'eventId'
        }], 400);

      data.eventId = findEvent._id;

      data.img = defaultImages.speaker;
      if(files) {
        const { img } = files
        if(img) {
          const avatarImg = await cloudinary.v2.uploader.upload(img[0].path);
          data.img = avatarImg.secure_url;
          await fs.unlink(img[0].path);
        }
      }

      const newSpeaker = await Controller.registerSpeaker(data);

      if(!newSpeaker) response.error(req, res, [ 'NO_SAVE_SPEAKER' ], 403);

      response.success(req, res, newSpeaker, 201)

    } catch (error) {
      next(error);
    }
  };

  const getAllSpeakers = async (req, res, next) => {
    if(!req.params.eventId) response.error(req, res, [ 'INCORRECT_EVENT_ID' ], 403);

    try {
      const speakers = await Controller.getSpeakers(req.params.eventId)
  
      if (!speakers) response.error(req, res, [ 'NO_SPEAKERS' ], 400);
      response.success(req, res, speakers, 200);
    } catch (error) {
      next(error);
    }
  }

  const getSpeaker = async (req, res, next) => {
    try {
      const speakers = await Controller.getSpeaker(req.params.speakerId);
  
      if (!speakers) response.error(req, res, [ 'NO_SPEAKERS' ], 400);
      response.success(req, res, speakers, 200);
    } catch (error) {
      next(error);
    }
  }

  const updateSpeaker = async (req, res, next) => {
    const { body: data, files, params } = req;
  
    try {
      if(files) {
        const { img } = files
        if(img) {
          const avatarImg = await cloudinary.v2.uploader.upload(img[0].path);
          data.img = avatarImg.secure_url;
          await fs.unlink(img[0].path);
        }
      }

      const speaker = await Controller.updateSpeaker(params.speakerId, data);
      if(!speaker) response.error(req, res, [ 'ERROR_ON_UPDATE_SPEAKER' ], 400);

      response.success(req, res, speaker, 200);
    } catch (error) {
      next(error);
    }
  }
  
  const deleteSpeaker = async (req, res, next) => {
    if(!req.params.speakerId) response.error(req, res, [ 'SEND_SPEAKER_ID' ], 403);
    
    try {
      const deleted = await Controller.deleteSpeaker(req.params.speakerId);
      if (deleted < 1) response.error(req, res, [ 'CANT_DELETE_SPEAKER' ], 403);

      response.success(req, res, [ 'DELETED' ], 200)
    } catch (error) {
      next(error);
    }
  }

  return {
    getSpeaker,
    registerSpeaker,
    getAllSpeakers,
    updateSpeaker,
    deleteSpeaker
  }
}

module.exports = speakerService;
