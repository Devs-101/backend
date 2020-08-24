const store = require('../../models/Organizations');
const controller = require('./controller');

module.exports = controller(store);