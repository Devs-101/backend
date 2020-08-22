const express = require('express');
const app = express();
// const authController = require('./controllers/authController')

const authRoutes = require('./routes/authRoutes')
const attendeesRoutes = require('./api/attendees/routes')

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
// app.use('/', authController)
authRoutes(app);
attendeesRoutes(app);

module.exports = app;