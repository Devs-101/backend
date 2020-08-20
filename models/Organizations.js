const { Schema, model } = require('mongoose');

const organizationsSchema = new Schema({
  name:{
    type: String,
    required: [true, 'the Organization name is required'],
    trim: true
  },
  logo: {
    type: String
  },
  description: {
    type: String
  },
  countEvents: {
    type: Schema.Types.ObjectId,
    ref: 'Events'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
}, {timestamps: true});

module.exports = model('Organizations', organizationsSchema);