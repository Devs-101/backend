const TABLE = 'Attendees';
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../__mocks__/mocks');
  }

  async function getAttendees(filter={}) {
    const items = await store.getAll(TABLE, filter);
    return items || [];
  }

  async function getAttendee(id) {
    const item = await store.getById(TABLE, id);
    return item || [];
  }

  async function createAttendee(data) {
    const created = await store.create(TABLE, data);
    return created || [];
  }

  return {
    getAttendees,
    getAttendee,
    createAttendee
  };
};
