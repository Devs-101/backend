const { Schema, model } = require('mongoose');

const SponsorsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'url is required'],
    trim: true
  },
  logo: {
    type: String
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  }
})

module.exports = model('Sponsors', SponsorsSchema);