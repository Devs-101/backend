const response = require('../utils/responses');

function attendeesService(storeInjection) {
  const controller = require('../api/attendees/controller') //SE IINICIALIZA CON EL STORE
  let store = storeInjection;
  if (!store) {
    store = require('../__mocks__/mocks');
  }

  const Controller = controller(storeInjection)

  const createAttendees = async (req, res) => {
    const { body: attendee } = req;
    try {
      const newAttendee = await Controller.createAttendee(attendee)
      response.success(req, res, newAttendee, 201);
    } catch (error) {
      return res.status(400).send({
        success: true,
        errors: error.errors,
        route: 'createAttendees'
      });
    }
  }
  
  const readAllAttendees = async (req, res) => {
    try {
      const attendees = await Controller.getAttendees();
      response.success(req, res, attendees, 201);
    } catch (error) {
      return res.status(400).send({
        success: true,
        errors: error.errors,
        route: 'createAttendees'
      });
    }
  }

  return {
    createAttendees,
    readAllAttendees
  }
}

module.exports = attendeesService;