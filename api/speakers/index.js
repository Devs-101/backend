const store = require('../../models/Speakers');
const controller = require('./controller');

module.exports = controller(store);