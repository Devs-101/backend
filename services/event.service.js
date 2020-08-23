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
  console.log('findEvent', findEvent)
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
      console.log('newEvent::::::::::::::::', err)
    }
  });
  console.log('newEvent', newEvent)
  return {
    data: newEvent
  }
}

const registerEvent = async (req, res) => {
  const { body: data } = req;
  const { params: params } = req;
  console.log('registerEvent :: data ::', data)
  console.log('registerEvent :: params ::', params.organizationId)
  
  try {
    const findOrganization = await findOrganizations(params.organizationId);
    console.log('registerEvent :: registerfindOrganizationEvent ::', findOrganization)
    data.organizationId = findOrganization

    if (findOrganization) {
      const event = await eventDuplicate(data.slug);
      console.log('registerEvent :: event ::', event)
      if (event) {
        res.status(200).json({ errors: [{
          value: data.name,
          msg: 'Event already exist',
          param: 'name',
          location: 'body'
        }] })
      } else {
        console.log('registerEvent :: registerEventSave ::', data)
        const newEvent = await registerEventSave(data);
        console.log('NEW EVENT :: ', newEvent)
        res.status(201).send({
          success: true,
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