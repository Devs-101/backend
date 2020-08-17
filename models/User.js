const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
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
  }
});

// Method to hash password
userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema);