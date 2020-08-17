const express = require('express');
const app = express();
const authController = require('./controllers/authController')

// Settings
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', authController)



module.exports = app;