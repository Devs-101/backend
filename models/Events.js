const { Schema, model } = require('mongoose');

const eventsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name of Event is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'The description is required'],
    trim: true
  },
  talks: [{
    name: String,
    description: String,
    date: Date,
    hour: Date,
    speakers: [{
      name: {
        type:String,
        require: true,
        trim: true
      },
      avatar: String,
      twitter: String,
      biografia: String,
      rol: String
    }]
  }],
  eventStatus: {
    type: Boolean,
    default: false
  },
  dateHour: {
    initDate: Date,
    endDate: Date
  },
  theme: {
    type: String,
    // At the moment we accept just 2 omnitrix or cureness!
  },
  broadcast: [{
    subject: {
      type: String,
      require: [true, 'the subject is required'],
      trim: true
    },
    text: String,
    image: String
  }],
  sponsors: [{
    name: String,
    logo: String,
    url: String
  }],
  countDown: {
    type: Boolean,
    default: true
  },
  allowRegister:{
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    unique: true
  },
  fullUrl: {
    type: String
  },
  organizators: [{
    name: String,
    avatar: String,
    rol: String
  }],
  bannerOrHeader: {
    isBanner: {
      // True is banner, false is header
      type: Boolean,
    },
    text: String,
    image: String
  },
  attendees: Number,
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organizations',
    required: true
  },
}, {timestamps: true})

module.exports = model('Events', eventsSchema);