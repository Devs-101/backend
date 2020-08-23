const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const attendeesRoutes = require('./api/attendees/routes')

const Attendees = require('./models/Attendees')

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
authRoutes(app);
eventRoutes(app);
attendeesRoutes(app, Attendees);

module.exports = app;