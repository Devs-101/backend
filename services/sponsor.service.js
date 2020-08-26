const response = require('../utils/responses')
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
  const sponsor = await Sponsors.findOne({name});
  if (sponsor) {
    return true;
  }
  return false;
}

const registerSponsorSave = async (body, file) => {
  const logoImg = await cloudinary.v2.uploader.upload(file.path)
  const data = {
    name: body.name,
    url: body.url,
    img: body.img,
    eventId: body.eventId
  }
  const sponsor = new Sponsors(data)
  sponsor.img = logoImg.secure_url;
  const newSponsor = await sponsor.save();
  await fs.unlink(file.path)
  return newSponsor
};

const registerSponsor = async (req, res) => {
  const { body: data, params, file } = req;
  
  try {
    const findEvent = await findEvents(params.eventId);
    data.eventId = findEvent
    
    if (findEvent) {
      const sponsor = await findSponsor(data.name);
      if (sponsor) {
        await fs.unlink(file.path)
        response.error(req, res, [{
          value: data.name,
          msg: 'Sponsor already exist',
          param: 'name',
          location: 'body'
          }], 200)
      } else {
        const newSponsor = await registerSponsorSave(data, file)
        response.success(req, res, newSponsor, 201)
      }
    } else {
      response.error(req, res, [{
        value: data.name,
        msg: 'Event doesnt exist',
        param: 'name',
        location: 'body'
        }], 200)
    }
  } catch (error) {
    error
  }
};

const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsors.find({eventId: req.params.eventId})
    
    if (!sponsors) {
      res.send('No data')
    } else {
      res.json({infoSponsors: sponsors})
    }
  } catch (error) {
    return res.send({error: [{
          value: req.params.eventId,
          msg: 'Event data error',
          param: 'eventId',
          location: 'params'
    }]})
  }
}

const deleteSponsor = async (req, res) => {
  const  id  = req.body.sponsorId
  console.log(id)
  
  try {
    const sponsor = await Sponsors.findById(id);
  
    if(sponsor) {
      sponsor.remove();
      res.status(200).send({success: 'ok', msg: 'sponsor deleted'})
    } else {
      res.status(403).send('Sponsor doesnt exist')
    }
  } catch (error) {
    error
  }
}

module.exports = {
  registerSponsor,
  getAllSponsors,
  deleteSponsor
}