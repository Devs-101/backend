const Organization = require('../models/Organizations');
const Event = require('../models/Events');

const findOrganizations = async (userId) => {
  const organization = await Organization.findOne({ userId });
  const organizationId = organization._id
  if(organizationId) {
    return true
  }
  return false
};

const eventDuplicate = async data => {
  const findEvent = await Event.findOne({_id: data});
  if (findEvent) {
    return true
  }
  return false
};

const registerEventSave = async (body) => {
  const newEvent = new Event(body);
  await newEvent.save();
  return {
    data: newEvent
  }
}

const registerEvent = async (req, res) => {
  const { body: data } = req;
  console.log(data)
  
  try {
    const findOrganization = await findOrganizations(data.userId);
    console.log(findOrganization)

    if (findOrganization) {
      const event = await eventDuplicate(data.name);
      console.log(event)
      if (event) {
        res.status(200).json({ errors: [{
          value: data.name,
          msg: 'Event already exist',
          param: 'name',
          location: 'body'
        }] })
      } else {
        console.log(req.body);
        const newEvent = await registerEventSave(req.body);
        console.log(newEvent)
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