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

  return {
    registerEvent,
    readAllEvents
  }
}

module.exports = eventsService;