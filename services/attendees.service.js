const Controller = require('../api/attendees')

const createAttendees = async (req, res) => {
  const { body: attendee } = req;
  try {
    const newAttendee = await Controller.createAttendee(attendee)
    return res.status(200).send({
      success: true,
      data: newAttendee,
      route: 'createAttendees'
    });
  } catch (error) {
    console.log('error::', error)
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
    console.log('error::', error)
  }
}

const readAttendees = async (req, res) => {
  const { id } = req.params;
  try {
    const attendee = await Controller.getAttendee(id)
    return res.status(200).send({
      success: true,
      data: attendee,
      route: 'readAttendees'
    });
  } catch (error) {
    console.log('error::', error)
  }
}

module.exports = {
  createAttendees,
  readAllAttendees,
  readAttendees
};