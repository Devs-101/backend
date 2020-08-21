const { Schema, model } = require('mongoose');

const AttendeesSchema = new Schema ({
  email: {
    type: String,
    required: [true, 'The email of attendee is required']
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  },
});

module.exports = model('Attendees', AttendeesSchema);