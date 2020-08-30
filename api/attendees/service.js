const response = require('../../utils/responses');

function attendeesService(storeInjection) {
  const controller = require('./controller');
  let store = storeInjection;

  if (!store) store = require('../../__mocks__/attendees.mocks').Ateendees;

  const Controller = controller(storeInjection)

  const registerAttendees = async (req, res, next) => {
    const { body: data } = req;
    const { params } = req;

    try {
      data.eventId = params.eventId
      const newAttendee = await Controller.createAttendee(data)
      response.success(req, res, newAttendee, 201);
    } catch (error) {
      next(error);
    }
  }
  
  const getAllAttendees = async (req, res, next) => {
    const { params } = req;

    try {
      const attendees = await Controller.getAttendees(params.eventId);
      response.success(req, res, attendees, 201);
    } catch (error) {
      next(error);
    }
  }

  return {
    registerAttendees,
    getAllAttendees
  }
}

module.exports = attendeesService;