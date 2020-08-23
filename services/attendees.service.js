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
      return res.status(200).send({
        success: true,
        data: newAttendee,
        route: 'createAttendees'
      });
      // const newAttendee = await Controller.createAttendee(attendee)
      
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
      const attendees = await Controller.getAttendees()
      return res.status(200).send({
        success: true,
        data: attendees,
        route: 'readAllAttendees'
      });
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