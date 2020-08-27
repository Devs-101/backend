const store = require('../../models/User');
const controller = require('./controller');

module.exports = controller(store);