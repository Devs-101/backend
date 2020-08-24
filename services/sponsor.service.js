const Events = require('../models/Events');


const findEvents = async eventId => {
  const event = await Events.findOne({ _id: eventId});
  if(event._id) {
    return event._id
  }
  return false
};

const sponsorDuplicate = async name => {
  const findSponsor = await Events.sponsors.findOne({ name });
  if (findSponsor) {
    return true
  }
  return false
};

const registerSponsorSave = async body => {
  const event = await Events.findOneAndUpdate({_id: body.eventId});
  if (!event) return false;
  const newSponsor = {
    name: body.name,
    url: body.url,
    logo: body.logo
  }
  event.sponsors.push(newSponsor);
  await event.save();
  return {
    data: newSponsor
  }
};

const registerSponsor = async (req, res) => {
  const { body: data, params: params } = req;
  
  try {
    const findEvent = await findEvents(params.eventId);
    data.eventId = findEvent
    
    if (findEvent) {
      const sponsor = await sponsorDuplicate(data.eventId);
      if (sponsor) {
        res.status(200).json({ errors: [{
          value: data.name,
          msg: 'Sponsor already exist',
          param: 'name',
          location: 'body'
          }]
        })
      } else {
        const newSponsor = await registerSponsorSave(data)
        res.status(201).send({
          success: true,
          example: true,
          data: newSponsor.data
        })
      }
    } else {
      res.status(200).json({ errors: [{
        value: data.name,
        msg: 'Event doesnt exist',
        param: 'name',
        location: 'body'
        }]
      })
    }
  } catch (error) {
    error
  }
};

module.exports = {
  registerSponsor
}