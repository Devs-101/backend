const { Schema, model } = require('mongoose');

const TalksSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  dateHour: {
    type: Date,
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  },
  speakerId: {
    type: Schema.Types.ObjectId,
    ref: 'Speakers',
    required: true
  }
});

module.exports = model('Talks', TalksSchema);