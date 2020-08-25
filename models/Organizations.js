const { Schema, model, models } = require('mongoose');
const getUniqueSlug = require('../utils/uniqueSlug');

const organizationsSchema = new Schema({
  name: {
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
  slug: {
    type: String,
    unique: true
  },
  deleted_at: {
    type: Date,
    default: null
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
}, {timestamps: true});

organizationsSchema.pre('save', async function(next) {
  const { name, slug } = await getUniqueSlug(this.name, this.slug, models.Organizations)
  this.name = name
  this.slug = slug

  next();
});

module.exports = model('Organizations', organizationsSchema);