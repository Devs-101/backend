const response = require('../utils/responses');

function eventsService(storeInjection) {
  const controller = require('../api/events/controller')
  const organization = require('../api/organization/controller');

  const Organizations = require('../models/Organizations');

  let store = storeInjection;
  let organizationStore = Organizations

  if (!store) {
    store = require('../__mocks__/events.mocks').Events;
    organizationStore =  require('../__mocks__/organizations.mocks').Organizations;
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

  const readAllEvents = async (req, res) => {
    try {
      const events = await Controller.getEvents();
      response.success(req, res, events, 201);
    } catch (error) {
      response.error(req, res, error.errors, 400)
    }
  };

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

  return {
    registerEvent,
    readAllEvents,
    publish
  }
}

module.exports = eventsService;