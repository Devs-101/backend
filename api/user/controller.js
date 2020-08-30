module.exports = function(injectedStore) {
  let store = injectedStore;

  if(!store) {
    store = require('../../__mocks__/users.mocks').Users;
  }

  async function getUser(_id) {
    const item = await store.findById({ _id })
    return item || false;
  };

  async function updateUser(_id, data) {
    const item = await store.findOneAndUpdate({ _id }, data, { 
      new: true,
      runValidators: true
    });
    return item || false
  };

  return {
    getUser,
    updateUser
  }
}