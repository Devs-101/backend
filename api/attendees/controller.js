module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) store = require('../../__mocks__/attendees.mocks').Ateendees;

  async function getAttendees(eventId) {
    const items = await store.find({ eventId });
    return items || [];
  }

  async function createAttendee(data) {
    const created = new store(data)
    await created.save()
    return created || false;
  }

  return {
    getAttendees,
    createAttendee
  };
};
