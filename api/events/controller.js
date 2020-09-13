module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) store = require('../../__mocks__/events.mocks').Events;

  async function registerEventSave (body) {
    const newEvent = new store(body);
    await newEvent.save();
  
    return newEvent
  }

  async function getEvents(organizationId) {
    const items = await store.find({ organizationId });
    return items || false;
  }

  async function getEvent(_id) {
    const items = await store.findOne({ _id });
    return items || false;
  }

  async function updateEvent(_id, data) {
    const item = await store.findOneAndUpdate({ _id }, data, { new: true, runValidators: true });
    return item || false
  }

  async function publishEvent(_id, theme) {
    const items = await store.findOneAndUpdate({ _id }, { eventStatus: true, theme }, { new: true });
    return items || false;
  }

  async function erase (_id) {
    await store.findOneAndUpdate({ _id }, { deleted_at: new Date() });
    const getDeleted = await this.getEvent(_id)
    return getDeleted
  }

  return {
    registerEventSave,
    getEvents,
    getEvent,
    updateEvent,
    publishEvent,
    erase
  };
};
