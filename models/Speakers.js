const { Schema, model } = require('mongoose');

const SpeakersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The speaker name is require'],
    trim: true
  },
  img: String,
  twitter: String,
  bio: String,
  rol: String,
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  }
})

module.exports = model('Speakers', SpeakersSchema);