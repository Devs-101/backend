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
    const items = await store.find({ userId, deleted_at: null });
    return items || [];
  }

  async function getOrganization(organizationId) {
    const organization = await store.findOne({ _id: organizationId });
    return organization || false;
  }

  async function register (data) {
    const created = new store(data);
    await created.save();
  
    return created
  }


  async function update(_id, data) {
    await store.findOneAndUpdate({ _id }, data);
    const getUpdated = await this.getOrganization(_id)
    return getUpdated
  }

  async function erase (_id) {
    await store.findOneAndUpdate({ _id }, { deleted_at: new Date() });
    const getDeleted = await this.getOrganization(_id)
    return getDeleted
  }

  return {
    findOrganizations,
    getOrganizations,
    getOrganization,
    register,
    update,
    erase
  };
};
