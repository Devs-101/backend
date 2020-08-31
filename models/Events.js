const { Schema, model, models } = require('mongoose');
const getUniqueSlug = require('../utils/uniqueSlug');

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
  eventStatus: {
    type: Boolean,
    default: false
  },
  dateHour: {
    initDate: Date,
    endDate: Date
  },
  theme: {
    type: String
  },
  broadcast: {
    subject: {
      type: String,
      require: [true, 'the subject is required'],
      trim: true,
      default: 'Remember my event'
    },
    text: {
      type: String,
      default: 'Thanks to register to my event.'
    },
    img: {
      type: String,
      default: 'image.png'
    },
  },
  img: {
    type: String,
    default: 'image.png'
  },
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
  bannerOrHeader: {
    isBanner: {
      // True is banner, false is header
      type: Boolean,
    },
    text: String,
    img: String
  },
  deleted_at: {
    type: Date,
    default: null
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organizations',
    required: true
  },
}, {timestamps: true})


eventsSchema.pre('save', async function(next) {
  if(!this.slug) this.slug = ''

  const { name, slug } = await getUniqueSlug(this.name, this.slug, models.Events)
  this.name = name
  this.slug = slug
  next();
});

module.exports = model('Events', eventsSchema);