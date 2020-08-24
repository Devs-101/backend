module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) store = require('../../__mocks__/organizations.mocks').Organizations;
  
  async function findOrganizations(organizationId) {
    const organization = await store.findOne({ _id: organizationId });
    if(organization)
      return organization._id
    return false
  };

  async function getOrganizations (userId) {
    const items = await store.find({ userId });
    return items || [];
  }

  async function getOrganization(organizationId) {
    const organization = await store.findOne({ _id: organizationId });
    return organization || false;
  }

  async function register (data) {
    const created = new store(data);
    await created.save(function(err) {
      if (err) {
        return err
      }
    });
  
    return created
  }

  return {
    findOrganizations,
    getOrganizations,
    getOrganization,
    register
  };
};
