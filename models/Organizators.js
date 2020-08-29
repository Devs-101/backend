const { Schema, model } = require('mongoose');

const OrganizatorsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The organizator name is required'],
    trim: true
  },
  img: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    default: 'Organizator'
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  }
});

module.exports = model('Organizators', OrganizatorsSchema);