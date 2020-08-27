const express = require('express');
const app = express();
const {CLOUD_NAME, API_KEY, API_SECRET} = require('./config/index')
const path = require('path');
const slash = require('express-slash');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary');
const cors = require('cors')

const authRoutes = require('./api/auth/routes');
const broadcastRoutes = require('./api/broadcast/routes')
const eventRoutes = require('./api/events/routes');
const attendeesRoutes = require('./api/attendees/routes')
const organizationRoutes = require('./api/organization/routes')
const sponsorRoutes = require('./routes/sponsorRoutes');
const speakerRoutes = require('./routes/speakerRoutes');
const talkRoutes = require('./routes/talksRoutes');


const Attendees = require('./models/Attendees');
const Events = require('./models/Events');
const Organizations = require('./models/Organizations');
const Users = require('./models/User')

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
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/upload'),
  // eslint-disable-next-line no-unused-vars
  filename: (req, file, cb, filename) => {
      cb(null, uuidv4() + path.extname(file.originalname))
  }
})
app.use(multer({ storage }).single('img'));

// routes
authRoutes(app, Users);
broadcastRoutes(app, Events);
eventRoutes(app, Events);
sponsorRoutes(app);
speakerRoutes(app);
talkRoutes(app);
attendeesRoutes(app, Attendees);
organizationRoutes(app, Organizations)

app.use(slash());

module.exports = app;