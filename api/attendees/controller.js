module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../__mocks__/attendees.mocks').Ateendees;
  }

  async function getAttendees() {
    const items = await store.find();
    return items || [];
  }

  async function createAttendee(data) {
    const created = new store(data)
    await created.save()
    return created || [];
  }

  return {
    getAttendees,
    createAttendee
  };
};
