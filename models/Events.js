const { Schema, model, models } = require('mongoose');
const slug = require('slug')

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


eventsSchema.pre('save', async function(next) {
  this.name = (this.name).trim()

  if(!this.slug) {
    this.slug = slug(this.name)
  } else {
    this.slug = (this.slug).trim()
    this.slug = slug(this.slug)
  }

  const count = await models.Events.countDocuments({ slug: {'$regex': this.slug } })

  let fullslug = this.slug
  if(count > 0) {
    fullslug += '-' + (count + 1)
  }
  this.slug = fullslug
  next();
});

module.exports = model('Events', eventsSchema);