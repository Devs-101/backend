module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../__mocks__/organizations.mocks').Organizations;
  }
  
  async function findOrganizations(organizationId) {
    const organization = await store.findOne({ _id: organizationId });
    if(organization)
      return organization._id
    return false
  };

  return {
    findOrganizations
  };
};
