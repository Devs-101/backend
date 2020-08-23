const Organization = require('../models/Organizations');
const Events = require('../models/Events');

const findOrganizations = async (organizationId) => {
  const organization = await Organization.findOne({ _id: organizationId });
  if(organization._id) {
    return organization._id
  }
  return false
};

const eventDuplicate = async slug => {
  const findEvent = await Events.findOne({ slug });
  if (findEvent) {
    return false
  }
  return false
};

const registerEventSave = async (body) => {
  const newEvent = new Events(body);
  newEvent.organizationId = body.organizationId
  await newEvent.save(function(err) {
    if (err) {
      // console.log('newEvent::::::::::::::::', err)
    }
  });

  return {
    data: newEvent
  }
}

const registerEvent = async (req, res) => {
  const { body: data } = req;
  const { params: params } = req;
  
  try {
    const findOrganization = await findOrganizations(params.organizationId);
    data.organizationId = findOrganization

    if (findOrganization) {
      const event = await eventDuplicate(data.slug);
      if (event) {
        res.status(200).json({ errors: [{
          value: data.name,
          msg: 'Event already exist',
          param: 'name',
          location: 'body'
        }] })
      } else {
        const newEvent = await registerEventSave(data);
        res.status(201).send({
          success: true,
          example: true,
          data: newEvent.data
        })
      }
    } else {
      res.status(200).json({ errors: [{
        value: data.Organization,
        msg: 'Organization doesnt exist',
        param: 'nameOrganization',
        location: 'body'
      }] })
    }
  } catch (error) {
    error
  }
};



module.exports = {
  registerEvent
}