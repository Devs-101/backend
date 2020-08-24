const express = require('express');
const app = express();
const {CLOUD_NAME, API_KEY, API_SECRET} = require('./config/index')
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./api/events/routes');
const attendeesRoutes = require('./api/attendees/routes')
const organizationRoutes = require('./api/organization/routes')
const sponsorRoutes = require('./routes/sponsorRoutes');

const Attendees = require('./models/Attendees')
const Events = require('./models/Events')
const Organizations = require('./models/Organizations');

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

// Middlewares
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/upload'),
  filename: (req, file, cb, filename) => {
      cb(null, uuidv4() + path.extname(file.originalname))
  }
})
app.use(multer({ storage }).single('image'));

// routes
authRoutes(app);
eventRoutes(app, Events);
sponsorRoutes(app);
attendeesRoutes(app, Attendees);
organizationRoutes(app, Organizations)

module.exports = app;