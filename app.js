const express = require('express');
const app = express();
const {CLOUD_NAME, API_KEY, API_SECRET} = require('./config/index')
const path = require('path');
const slash = require('express-slash');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary');
const cors = require('cors')
const helmet = require('helmet');

const {
  notFoundHandler,
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/errorHandlers')


//Routes Call
const authRoutes = require('./api/auth/routes');
const userRoutes = require('./api/user/routes');
const broadcastRoutes = require('./api/broadcast/routes')
const eventRoutes = require('./api/events/routes');
const attendeesRoutes = require('./api/attendees/routes')
const organizationRoutes = require('./api/organization/routes')
const sponsorRoutes = require('./api/sponsors/routes');
const speakerRoutes = require('./api/speakers/routes');
const talkRoutes = require('./api/talks/routes');
const organizatorRoutes = require('./api/organizators/routes');

//Models Call
const Attendees = require('./models/Attendees');
const Events = require('./models/Events');
const Organizations = require('./models/Organizations');
const Users = require('./models/User');
const Sponsors = require('./models/Sponsors');
const Speakers = require('./models/Speakers');
const Talks = require('./models/Talks');
const Organizators = require('./models/Organizators');
const User = require('./models/User');

// Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

// Middlewares
app.use(helmet())
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/upload'),
  // eslint-disable-next-line no-unused-vars
  filename: (req, file, cb, filename) => {
      cb(null, uuidv4() + path.extname(file.originalname))
  }
})
app.use(multer({ storage }).fields([{ name: 'img', maxCount: 2 },  { name: 'bannerOrHeader[img]', maxCount: 1 }]));

// Routes
authRoutes(app, Users);
userRoutes(app, User);
broadcastRoutes(app, Events);
eventRoutes(app, Events);
sponsorRoutes(app, Sponsors);
speakerRoutes(app, Speakers);
talkRoutes(app, Talks);
attendeesRoutes(app, Attendees);
organizationRoutes(app, Organizations);
organizatorRoutes(app, Organizators);

app.use(slash());

app.use(notFoundHandler);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

module.exports = app;