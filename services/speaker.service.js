const response = require('../utils/responses');
const Events = require('../models/Events');
const Speakers = require('../models/Speakers');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');


const findEvents = async eventId => {
  const event = await Events.findOne({_id: eventId});
  if(event._id) {
    return event._id
  }
  return false
};

const findSpeaker = async name => {
  const speaker = await Speakers.findOne({name});
  if (speaker) {
    return true;
  }
  return false;
};

const registerSpeakerSave = async (body, file) => {
  const avatarImg = await cloudinary.v2.uploader.upload(file.path);
  const data = {
    name: body.name,
    img: body.img,
    twitter: body.twitter,
    bio: body.bio,
    rol: body.rol,
    eventId: body.eventId
  }
  const speaker = new Speakers(data);
  speaker.img = avatarImg.secure_url;
  const newSpeaker = await speaker.save();
  await fs.unlink(file.path);
  return newSpeaker
};

const registerSpeaker = async (req, res) => {
  const { body: data, params, file } = req;
  try {
    const findEvent = await findEvents(params.eventId);
    data.eventId = findEvent;

    if (findEvent) {
      const speaker = await findSpeaker(data.name);
      if (speaker) {
        await fs.unlink(file.path)
        response.error(req, res, [{
          value: data.name,
          msg: 'Speaker already exist',
          param: 'name',
          location: 'body'
          }], 200)
      } else {
        const newSpeaker = await registerSpeakerSave(data, file)
        response.success(req, res, newSpeaker, 201)
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

const getAllSpeakers = async (req, res, next) => {
  try {
    const speakers = await Speakers.find({ eventId: req.params.eventId})

    if (!speakers) {
      res.send('No data')
    } else {
      res.json({ infoSpeakers: speakers})
    }
  } catch (error) {
      next(res.send({error: [{
          value: req.params.eventId,
          msg: 'Event data error',
          param: 'eventId',
          location: 'params'
    }]}))
  }
}

const deleteSpeaker = async (req, res) => {
  const  id  = req.body.speakerId
  
  try {
    const speaker = await Speakers.findById(id);
  
    if(speaker) {
      speaker.remove();
      res.status(200).send({success: 'ok', msg: 'speaker deleted'})
    } else {
      res.status(403).send('Error')
    }
  } catch (error) {
    error
  }
}

module.exports = {
  registerSpeaker,
  getAllSpeakers,
  deleteSpeaker
}