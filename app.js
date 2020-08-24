const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./api/events/routes');
const attendeesRoutes = require('./api/attendees/routes')

const Attendees = require('./models/Attendees')
const Events = require('./models/Events')

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
authRoutes(app);
eventRoutes(app, Events);
attendeesRoutes(app, Attendees);

module.exports = app;