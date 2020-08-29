const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String
  }
}, {timestamps: true});

// Method to hash password
usersSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

usersSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }

module.exports = model('Users', usersSchema);