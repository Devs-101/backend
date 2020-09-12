const { Schema, model } = require('mongoose');

const SpeakersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The speaker name is require'],
    trim: true
  },
  img: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  rol: {
    type: String,
    trim: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  }
})

module.exports = model('Speakers', SpeakersSchema);