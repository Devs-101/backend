const Slug = require('slug')

const getUniqueSlug = async (name, slug, model) => {
  name = name.trim()

  if(!slug) {
    slug = Slug(name)
  } else {
    slug = slug.trim()
    slug = Slug(slug)
  }

  const count = await model.countDocuments({ slug: {'$regex': slug } })

  let fullslug = slug
  if(count > 0)
    fullslug += `-${(count + 1)}`

  return {
    name: name,
    slug: fullslug
  }
}

module.exports = getUniqueSlug