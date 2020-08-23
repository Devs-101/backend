const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
authRoutes(app);
eventRoutes(app);

module.exports = app;