module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) store = require('../../__mocks__/sponsors.mocks').Sponsors;

  async function registerSponsor(body) {
    const item = new store(body);
    await item.save();
  
    return item || false;
  }

  async function getSponsors(eventId) {
    const items = await store.find({ eventId });
    return items || [];
  }

  async function getSponsor(_id) {
    const items = await store.findOne({ _id });
    return items || false;
  }

  async function updateSponsor(_id, data) {
    const items = await store.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true
    });

    return items || false;
  }

  async function deleteSponsor(_id) {
    const item = await store.deleteOne({ _id });

    return item.deletedCount || false;
  }

  return {
    registerSponsor,
    getSponsors,
    getSponsor,
    updateSponsor,
    deleteSponsor
  };
};
