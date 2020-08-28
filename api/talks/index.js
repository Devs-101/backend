const store = require('../../models/Talks');
const controller = require('./controller');

module.exports = controller(store);