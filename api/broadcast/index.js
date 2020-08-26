const store = require('../../models/Events');
const controller = require('./controller');

module.exports = controller(store);