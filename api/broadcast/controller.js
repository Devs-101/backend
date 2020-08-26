module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) store = require('../../__mocks__/broadcast.mocks').Broadcast;

  async function updateBroadcast(_id, broadcast) {
    const item = await store.findOneAndUpdate({ _id }, { $set: { broadcast } }, { new: true }).select('broadcast');
    return item || false
  }

  async function getBroadcast(_id) {
    const items = await store.findOne({ _id }).select('broadcast');
    return items || [];
  }

  return {
    updateBroadcast,
    getBroadcast
  };
};
