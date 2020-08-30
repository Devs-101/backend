const response = require('../../utils/responses');

function talksService(storeInjection) {
  const controller = require('./controller');
  const events = require('../events/controller');
  const speakers = require('../speakers/controller');


  let store = storeInjection;
  let eventsStore = require('../../models/Events');
  let speakersStore = require('../../models/Speakers');

  if (!store) {
    store = require('../../__mocks__/talks.mocks').Talks;
    eventsStore = require('../../__mocks__/events.mocks').Events;
    speakersStore = require('../../__mocks__/speakers.mocks').Speakers;
  }

  const Controller = controller(store);
  const Events = events(eventsStore);
  const Speakers = speakers(speakersStore);

  const registerTalk = async(req, res, next) => {
    const { body: data, params } = req;
  
    try {
      const findEvent = await Events.getEvent(params.eventId);
      if(!findEvent) response.error(req, res, [{
        value: data.name,
        msg: 'Event doesnt exist',
        param: 'eventId'
        }], 400);

      data.eventId = findEvent._id

      const findSpeaker = await Speakers.getSpeaker(data.speakerId);
      if(!findSpeaker) response.error(req, res, [{
        value: data.name,
        msg: 'Speaker doesnt exist',
        param: 'speakerId'
        }], 400);
  
        const newTalk = await Controller.registerTalk(data);
        if(!newTalk) response.error(req, res, [ 'NO_SAVE_TALK' ], 403);
  
        response.success(req, res, newTalk, 201);
    } catch (error) {
      next(error);
    }
  };

  const getAllTalks = async (req, res, next) => {
    if(!req.params.eventId) response.error(req, res, [ 'INCORRECT_EVENT_ID' ], 403);

    try {
      const talks = await Controller.getTalks(req.params.eventId)
  
      if (!talks) response.error(req, res, [ 'NO_TALKS' ], 400);
      response.success(req, res, talks, 200);
    } catch (error) {
      next(error);
    }
  };

  const getTalk = async (req, res, next) => {
    try {
      const talk = await Controller.getTalk(req.params.talkId);
  
      if (!talk) response.error(req, res, [ 'NO_TALKS' ], 400);
      response.success(req, res, talk, 200);
    } catch (error) {
      next(error);
    }
  };

  const updateTalk = async (req, res, next) => {
    const { body: data, params } = req;
  
    try {
      const talk = await Controller.updateTalk(params.talkId, data);
      if(!talk) response.error(req, res, [ 'ERROR_ON_UPDATE_TALK' ], 400);

      response.success(req, res, talk, 200);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteTalk = async (req, res, next) => {
    if(!req.params.talkId) response.error(req, res, [ 'SEND_TALK_ID' ], 403);
    
    try {
      const deleted = await Controller.deleteTalk(req.params.talkId);
      if (deleted < 1) response.error(req, res, [ 'CANT_DELETE_TALK' ], 403);

      response.success(req, res, [ 'DELETED' ], 200)
    } catch (error) {
      next(error);
    }
  };

  return {
    registerTalk,
    getAllTalks,
    getTalk,
    updateTalk,
    deleteTalk
  }
}

module.exports = talksService;
