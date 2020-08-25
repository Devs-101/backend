const Events = require('../models/Events');
const Sponsors = require('../models/Sponsors');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');


const findEvents = async eventId => {
  const event = await Events.findOne({_id: eventId});
  if(event._id) {
    return event._id
  }
  return false
};

const findSponsor = async name => {
  console.log(`Este es el name:: ${name}`);
  const sponsor = await Sponsors.findOne({name});
  console.log(`Este es el sponsor:: ${sponsor}`);
  if (sponsor) {
    return true;
  }
  return false;
}

const registerSponsorSave = async body => {
  //console.log(body)
  //const logoImg = await cloudinary.v2.uploader.upload(body.file.path)
  const data = {
    name: body.name,
    url: body.url,
    logo: body.logo,
    eventId: body.eventId
  }
  const sponsor = new Sponsors(data)
  //sponsor.logo = logoImg.secure_url;
  const newSponosr = await sponsor.save();
  //await fs.unlink(body.file.path)
  return newSponosr
};

const registerSponsor = async (req, res) => {
  const { body: data, params: params } = req;
  console.log(req.file)
  console.log('Esta es la eventId: ' + params.eventId)
  
  try {
    const findEvent = await findEvents(params.eventId);
    data.eventId = findEvent
    
    if (findEvent) {
      const sponsor = await findSponsor(data.name);
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

const getAllSponsors = async (req, res, next) => {
  try {
    const sponsors = await Sponsors.find({eventId: req.params.eventId})
    
    if (!sponsors) {
      res.send('No data')
    } else {
      res.json({infoSponsors: sponsors})
    }
  } catch (error) {
    return next(res.send({error: [{
          value: req.params.eventId,
          msg: 'Event data error',
          param: 'eventId',
          location: 'params'
    }]}))
  }
}

module.exports = {
  registerSponsor,
  getAllSponsors
}