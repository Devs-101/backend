module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) store = require('../../__mocks__/speakers.mocks').Speakers;

  async function registerSpeaker(body) {
    const item = new store(body);
    await item.save();
  
    return item || false;
  }

  async function getSpeakers(eventId) {
    const items = await store.find({ eventId });
    return items || false;
  }

  async function getSpeaker(_id) {
    const items = await store.findOne({ _id });
    return items || false;
  }

  async function updateSpeaker(_id, data) {
    const items = await store.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true
    });

    return items || false;
  }

  async function deleteSpeaker(_id) {
    const item = await store.deleteOne({ _id });

    console.log('item', item.deletedCount);

    return item.deletedCount || false;
  }

  return {
    registerSpeaker,
    getSpeakers,
    getSpeaker,
    updateSpeaker,
    deleteSpeaker
  };
};
