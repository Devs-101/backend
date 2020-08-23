const store = require('../../models/Attendees');
const controller = require('./controller');

module.exports = controller(store);