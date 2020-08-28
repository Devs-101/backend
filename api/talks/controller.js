module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) store = require('../../__mocks__/talks.mocks').Talks;

  async function registerTalk(body) {
    const item = new store(body);
    await item.save();
  
    return item || false;
  }

  async function getTalks(eventId) {
    const items = await store.find({ eventId }).populate('speakerId');
    return items || false;
  }

  async function getTalk(_id) {
    const items = await store.findOne({ _id })
                              .populate('speakerId')
                              .populate('eventId');
    return items || false;
  }

  async function updateTalk(_id, data) {
    const items = await store.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true
    }).populate('speakerId').populate('eventId');

    return items || false;
  }

  async function deleteTalk(_id) {
    const item = await store.deleteOne({ _id });

    console.log('item', item.deletedCount);

    return item.deletedCount || false;
  }

  return {
    registerTalk,
    getTalks,
    getTalk,
    updateTalk,
    deleteTalk
  };
};
