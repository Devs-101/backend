module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require('../../__mocks__/events.mocks').Events;
  }

  async function registerEventSave (body) {
    const newEvent = new store(body);
    await newEvent.save(function(err) {
      if (err) {
        return err
      }
    });
  
    return newEvent
  }

  async function getEvents() {
    const items = await store.find();
    return items || [];
  }

  return {
    registerEventSave,
    getEvents
  };
};
