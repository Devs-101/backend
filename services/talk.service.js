const response = require('../utils/responses');
const Events = require('../models/Events');
const Speakers = require('../models/Speakers');
const Talks = require('../models/Talks');


const findEvents = async eventId => {
  const event = await Events.findOne({_id: eventId});
  if(event._id) {
    return event._id
  }
  return false
};

const findSpeakers = async speakerId => {
  const speaker = await Speakers.findOne({_id: speakerId});
  if (speaker) {
    return true
  }
  return false;
};

const findTalks = async name => {
  const talk = await Talks.findOne({name});
  if (talk) {
    return true;
  }
  return false;
};

const registerTalkSave = async body => {
  const talk = new Talks(body);
  const newTalk = await talk.save();
  return newTalk
};

const registerTalk = async(req, res) => {
  const { body: data, params } = req;

  try {
    const findEvent = await findEvents(params.eventId);
    data.eventId = findEvent

    if (findEvent) {
      const findSpeaker = await findSpeakers(data.speakerId);
      if (findSpeaker) {
        const findTalk = await findTalks(data.name);
        if (findTalk) {
            response.error(req, res, [{
            value: data.name,
            msg: 'Talk already exist',
            param: 'name',
            location: 'body'
            }], 200)
        } else {
          const newTalk = await registerTalkSave(data);
          response.success(req, res, newTalk, 201);
        }
      } else {
        response.error(req, res, [{
          value: data.speakerId,
          msg: 'Speaker doesnt exist',
          param: 'name',
          location: 'body'
          }], 200)
      }
    }
  } catch (error) {
    error
  }
};

const getAllTalks = async (req, res, next) => {
  try {
    const talks = await Talks.find({ eventId: req.params.eventId});

    if(!talks) {
      res.send('No data')
    } else {
      res.json({ infoTalks: talks})
    }
  } catch (error) {
    error
  }
}

module.exports = {
  registerTalk,
  getAllTalks
}