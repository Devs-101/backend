const response = require('../../utils/responses');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const { defaultImages } = require('../../utils/defaultImages');

function eventsService(storeInjection) {
  const controller = require('./controller')
  const organization = require('../organization/controller');
  const speaker = require('../speakers/controller');
  const sponsor = require('../sponsors/controller');
  const talk = require('../talks/controller');

  const Organizations = require('../../models/Organizations');
  const Speakers = require('../../models/Speakers');
  const Sponsors = require('../../models/Sponsors');
  const Talks = require('../../models/Talks');

  let store = storeInjection;
  let organizationStore = Organizations
  let speakersStore = Speakers
  let sponsorsStore = Sponsors
  let talksStore = Talks

  if (!store) {
    store = require('../../__mocks__/events.mocks').Events;
    organizationStore =  require('../../__mocks__/organizations.mocks').Organizations;
    speakersStore =  require('../../__mocks__/speakers.mocks').Speakers;
    sponsorsStore =  require('../../__mocks__/sponsors.mocks').Sponsors;
    talksStore =  require('../../__mocks__/talks.mocks').Talks;
  }

  const Controller = controller(store)
  const Organization = organization(organizationStore)
  const Speaker = speaker(speakersStore)
  const Sponsor = sponsor(sponsorsStore)
  const Talk = talk(talksStore)
  
  const registerEvent = async (req, res, next) => {
    const { body: data, params, file } = req;
    
    try {
      const findOrganization = await Organization.findOrganizations(params.organizationId);
      data.organizationId = findOrganization
      data.img = defaultImages.events;
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }
  
      if (findOrganization) {
        const newEvent = await Controller.registerEventSave(data);
        response.success(req, res, newEvent, 201);
      } else {
        response.error(req, res, [{
            "msg": "Organization Id is required",
            "param": "organizationID"
          }],
          404
        );
      }
    } catch (error) {
      next(error);
    }
  };

  const getAllEvents = async (req, res, next) => {
    const { params: params } = req;

    try {
      const events = await Controller.getEvents(params.organizationId);
      response.success(req, res, events, 201);
    } catch (error) {
      next(error);
    }
  };

  const getEvent = async (req, res, next) => {
    const { params } = req;
    try {
      const event = await Controller.getEvent(params.eventId);
  
      if (!event) response.error(req, res, [ 'NO_EVENT' ], 400);
      response.success(req, res, event, 200);
    } catch (error) {
      next(error);
    }
  }

  const updateEvent = async (req, res, next) => {
    const { body: data, params, file } = req;
  
    try {
      if(file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }
      const event = await Controller.updateEvent(params.eventId, data);
      if(!event) response.error(req, res, [ 'ERROR_ON_UPDATE_EVENT' ], 400);

      response.success(req, res, event, 200);
    } catch (error) {
      next(error);
    }
  }

  const publish = async (req, res, next) => {
    const { body: data, params } = req;

    try {
      const event = await Controller.getEvent(params.eventId);
      let checkComplete = []
      if (event) {
        if(!event.name) checkComplete.push('NO_EVENT_NAME')
        if(!event.dateHour.initDate) checkComplete.push('NO_EVENT_START_DATE')
        if(!event.img) checkComplete.push('NO_EVENT_LOGO')

        if(!event.broadcast.subject) checkComplete.push('NO_EVENT_BROADCAST_SUBJECT')
        if(!event.broadcast.text) checkComplete.push('NO_EVENT_BROADCAST_TEXT')
        if(!event.broadcast.img) checkComplete.push('NO_EVENT_BROADCAST_IMG')

        if(event.bannerOrHeader.isBanner) {
          if(!event.bannerOrHeader.img) checkComplete.push('NO_EVENT_BANNER_IMAGE')
        } else {
          if(!event.bannerOrHeader.text) checkComplete.push('NO_EVENT_HEADER_IMAGE')
        }

        if(checkComplete.length > 0) {
          response.error(req, res, checkComplete, 400)
        } else {
          const published = await Controller.publishEvent(event._id, data.theme)
          response.success(req, res, published, 201);
        }
      } else {
        response.error(req, res, [ 'EVENT_NOT_FOUND' ], 400)
      }
    } catch (error) {
      next(error);
    }
  };

  const readyForPublish = async (req, res, next) => {
    const { params } = req;

    try {
      const event = await Controller.getEvent(params.eventId);
      let checkComplete = []
      if (event) {
        if(!event.name) checkComplete.push('NO_EVENT_NAME')
        if(!event.dateHour.initDate) checkComplete.push('NO_EVENT_START_DATE')
        if(!event.img) checkComplete.push('NO_EVENT_LOGO')

        if(!event.broadcast.subject) checkComplete.push('NO_EVENT_BROADCAST_SUBJECT')
        if(!event.broadcast.text) checkComplete.push('NO_EVENT_BROADCAST_TEXT')
        if(!event.broadcast.img) checkComplete.push('NO_EVENT_BROADCAST_IMG')

        if(event.bannerOrHeader.isBanner) {
          if(!event.bannerOrHeader.img) checkComplete.push('NO_EVENT_BANNER_IMAGE')
        } else {
          if(!event.bannerOrHeader.text) checkComplete.push('NO_EVENT_HEADER_IMAGE')
        }

        const data = {
          eventId: params.eventId,
          checkComplete,
          initDate: event.dateHour.initDate
        }
        response.success(req, res, data, 200);
      } else {
        response.error(req, res, [ 'EVENT_NOT_FOUND' ], 400)
      }
    } catch (error) {
      next(error);
    }
  };

  const erase = async (req, res, next) => {
    const { params } = req;

    try {
      const event = await Controller.erase(params.eventId)
      response.success(req, res, event, 201);
    } catch (error) {
      next(error);
    }
  };

  const getPublishedEvent = async (req, res, next) => {
    const { params } = req;
    try {
      const event = await Controller.getEvent(params.eventId);
      const eventSpeakers = await Speaker.getSpeakers(params.eventId);
      const eventSponsors = await Sponsor.getSponsors(params.eventId);
      const eventTalks = await Talk.getTalks(params.eventId);

      const data = {
        event,
        speakers: eventSpeakers,
        sponsors: eventSponsors,
        talks: eventTalks
      }
  
      if (!event) response.error(req, res, [ 'NO_EVENT' ], 400);
      response.success(req, res, data, 200);
    } catch (error) {
      next(error);
    }
  }

  return {
    registerEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    publish,
    readyForPublish,
    getPublishedEvent,
    erase
  }
}

module.exports = eventsService;