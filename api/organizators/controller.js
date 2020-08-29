module.exports = function (injectedStore) {
  let store = injectedStore;

  if(!store) store = require('../../__mocks__/organizators.mocks').Organizator;

  async function registerOrganizator(body) {
    const item = new store(body);
    await item.save();
    return item || false;
  }

  async function getOrganizators(eventId) {
    const items = await store.find({ eventId });
    return items || false;
  }

  async function getOrganizator(_id) {
    const item = await store.findOne({ _id });
    return item || false;
  }

  async function updateOrganizator(_id, data) {
    const item = await store.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true
    });

    return item || false
  }

  async function deleteOrganizator(_id) {
    const item = await store.deleteOne({ _id });
    return item.deletedCount || false;
  }

  return {
    registerOrganizator,
    getOrganizators,
    getOrganizator,
    updateOrganizator,
    deleteOrganizator
  }
}