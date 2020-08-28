const response = require('../../utils/responses');

function eventsService(storeInjection) {
  const controller = require('./controller')
  const organization = require('../organization/controller');

  const Organizations = require('../../models/Organizations');

  let store = storeInjection;
  let organizationStore = Organizations

  if (!store) {
    store = require('../../__mocks__/events.mocks').Events;
    organizationStore =  require('../../__mocks__/organizations.mocks').Organizations;
  }

  const Controller = controller(store)
  const Organization = organization(organizationStore)
  
  const registerEvent = async (req, res) => {
    const { body: data } = req;
    const { params: params } = req;
    
    try {
      const findOrganization = await Organization.findOrganizations(params.organizationId);
      data.organizationId = findOrganization
  
      if (findOrganization) {
        const newEvent = await Controller.registerEventSave(data);
        response.success(req, res, newEvent, 201);
      } else {
        response.error(
          req,
          res,
          [{
            "msg": "Organization Id is required",
            "param": "organizationID"
          }],
          200
        );
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getAllEvents = async (req, res) => {
    try {
      const events = await Controller.getEvents();
      response.success(req, res, events, 201);
    } catch (error) {
      response.error(req, res, error.errors, 400)
    }
  };

  const getEvent = async (req, res, next) => {
    try {
      const event = await Controller.getEvent(req.params.eventId);
  
      if (!event) response.error(req, res, [ 'NO_EVENT' ], 400);
      response.success(req, res, event, 200);
    } catch (error) {
        next(res.send({error: [{
            value: req.params.eventId,
            msg: 'Incorrect data error',
            param: 'eventId'
      }]}))
    }
  }

  const updateEvent = async (req, res) => {
    const { body: data, params } = req;
  
    try {
      const event = await Controller.updateEvent(params.eventId, data);
      if(!event) response.error(req, res, [ 'ERROR_ON_UPDATE_EVENT' ], 400);

      response.success(req, res, event, 200);
    } catch (error) {
      response.error(req, res, [ 'ERROR_UPDATE_EVENT' ], 403);
    }
  }

  const publish = async (req, res) => {
    const { params: params } = req;

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
          const published = await Controller.publishEvent(event._id)
          response.success(req, res, published, 201);
        }
      } else {
        response.error(req, res, [ 'EVENT_NOT_FOUND' ], 400)
      }
    } catch (error) {
      response.error(req, res, [ 'EVENT_NOT_FOUND' ], 400)
    }
  };

  const erase = async (req, res) => {
    const { params } = req;

    console.log(params)
    try {
      const event = await Controller.erase(params.eventId)
      console.log(event)
      response.success(req, res, event, 201);
    } catch (error) {
      response.error(req, res, error.errors, 400)
    }
  };

  return {
    registerEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    publish,
    erase
  }
}

module.exports = eventsService;