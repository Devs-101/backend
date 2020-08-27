module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) store = require('../../__mocks__/events.mocks').Events;

  async function registerEventSave (body) {
    const newEvent = new store(body);
    await newEvent.save();
  
    return newEvent
  }

  async function getEvents() {
    const items = await store.find();
    return items || false;
  }

  async function getEvent(_id) {
    const items = await store.findOne({ _id });
    return items || false;
  }

  async function publishEvent(_id) {
    const items = await store.findOneAndUpdate({ _id }, { eventStatus: true }, { new: true });
    return items || false;
  }

  return {
    registerEventSave,
    getEvents,
    getEvent,
    publishEvent
  };
};
