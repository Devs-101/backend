const Events = require('../models/Events');


const findEvents = async eventId => {
  const event = await Events.findOne({ _id: eventId});
  //console.log(`findEvents::event:: ${event}`)
  if(event._id) {
    return event._id
  }
  return false
};

const sponsorDuplicate = async name => {
  console.log(`sponsorDuplicate:: ${name}`)
  const findSponsor = await Events.findOne({ sponsors: { name } });
  console.log(`sponsorDuplicate:: findSponsor:: ${findSponsor}`)
  if (findSponsor) {
    return true
  }
  return false
};

const registerSponsorSave = async body => {
  console.log(body)
  const event = await Events.findOne({_id: body.eventId});
  console.log(`registerSponsorSave:: ${event}`)
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
    //console.log(`findEvent:: ${findEvent}`)
    data.eventId = findEvent
    
    if (findEvent) {
      const sponsor = await sponsorDuplicate(data.name);
      console.log(`sponsor:: ${sponsor}`)
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
        console.log(`newSponsor:: ${newSponsor}`)
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

const getAllSponsors = async (req, res) => {
  const event = await Events.findById( req.params.eventId )
  const sponsors = event.sponsors
  console.log(`Estos son los sponsors: ${sponsors}`);
  if (!sponsors) {
    res.send('No data')
  } else {
    res.send(sponsors)
  }
}

module.exports = {
  registerSponsor,
  getAllSponsors
}