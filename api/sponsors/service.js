const response = require('../../utils/responses');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
// const { defaultImages } = require('../../utils/defaultImages');

function sponsorService(storeInjection) {
  const controller = require('./controller');
  const events = require('../events/controller');

  let store = storeInjection;
  let eventsStore = require('../../models/Events');

  if (!store) {
    eventsStore = require('../../__mocks__/events.mocks').Events;
    store = require('../../__mocks__/sponsors.mocks').Sponsors;
  }

  const Controller = controller(store);
  const Events = events(eventsStore);

  const registerSponsor = async (req, res) => {
    const { body: data, params, file } = req;

    try {
      const findEvent = await Events.getEvent(params.eventId)
      if(!findEvent) response.error(req, res, [{
        value: data.name,
        msg: 'Event doesnt exist',
        param: 'name'
        }], 400)

      data.eventId = findEvent._id;

      data.img = 'defaultImages.sponsor';
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }

      const newSponsor = await Controller.registerSponsor(data);

      if(!newSponsor) response.error(req, res, [ 'NO_SAVE_SPONSOR' ], 403);

      response.success(req, res, newSponsor, 201)

    } catch (error) {
      res.send('error');
    }
  };

  const getAllSponsors = async (req, res, next) => {
    if(!req.params.eventId) response.error(req, res, [ 'INCORRECT_EVENT_ID' ], 403);
    try {
      const sponsors = await Controller.getSponsors(req.params.eventId);
      response.success(req, res, sponsors, 200);
    } catch (error) {
          next(res.send({error: [{
            value: req.params.eventId,
            msg: 'Incorrect data error',
            param: 'eventId'
      }]}))
    }
  }

  const getSponsor = async (req, res, next) => {
    try {
      const sponsors = await Controller.getSponsor(req.params.sponsorId);
  
      response.success(req, res, sponsors, 200);
    } catch (error) {
        next(res.send({error: [{
            value: req.params.sponsorId,
            msg: 'Incorrect data error',
            param: 'sponsorId'
      }]}))
    }
  }

  const updateSponsor = async (req, res) => {
    const { body: data, file, params } = req;
  
    try {
      if (file) {
        const avatarImg = await cloudinary.v2.uploader.upload(file.path);
        data.img = avatarImg.secure_url;
        await fs.unlink(file.path);
      }

      const sponsor = await Controller.updateSponsor(params.sponsorId, data);
      if(!sponsor) response.error(req, res, [ 'ERROR_ON_UPDATE_SPONSOR' ], 400);

      response.success(req, res, sponsor, 200);
    } catch (error) {
      response.error(req, res, [ 'ERROR_UPDATE_SPONSOR' ], 403);
    }
  }

  const deleteSponsor = async (req, res) => {
    if(!req.params.sponsorId) response.error(req, res, [ 'SEND_SPONSOR_ID' ], 403);
    
    try {
      const deleted = await Controller.deleteSponsor(req.params.sponsorId);
      if (deleted < 1) response.error(req, res, [ 'CANT_DELETE_SPONSOR' ], 403);

      response.success(req, res, [ 'DELETED' ], 200)
    } catch (error) {
      response.error(req, res, [ 'CANT_DELETE_SPONSOR' ], 403);
    }
  }

  return {
    registerSponsor,
    getAllSponsors,
    getSponsor,
    updateSponsor,
    deleteSponsor
  }
}

module.exports = sponsorService;

/*
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

const updateSponsor = async (req, res) => {
  const {body: data, file} = req;
  const logoImg = await cloudinary.v2.uploader.upload(file.path)

    try {
      const findSponsor = await Sponsors.findById(data.sponsorId);
      const sponsorUpdate = {
        name: data.name,
        url: data.url,
        img: data.img,
      }
      sponsorUpdate.img = logoImg.secure_url
      if(!findSponsor) res.status(404).send('Sponsor doesnt exits')
      const sponsor = await Sponsors.findOneAndUpdate({_id: req.body.sponsorId}, sponsorUpdate, {
        new: true,
        runValidators: true
      });
      res.status(200).json({success: 'Ok', info: sponsor})
    } catch (error) {
      res.send('error')
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
  updateSponsor,
  deleteSponsor
}
*/

