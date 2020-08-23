const { Schema, models, model } = require('mongoose');

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

AttendeesSchema.path('email').validate(async (email) => {
  const emailCount = await models.Attendees.countDocuments({ email })
  return !emailCount
}, 'Email already exists')

module.exports = model('Attendees', AttendeesSchema);