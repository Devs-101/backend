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

  async function registerOrganization (data) {
    const created = new store(data);
    await created.save();
  
    return created
  }


  async function updateOrganization(_id, data) {
    const items = await store.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true
    });

    return items || false;
  }

  async function deleteOrganization(_id) {
    await store.findOneAndUpdate({ _id }, { deleted_at: new Date() });
    const getDeleted = await this.getOrganization(_id)
    return getDeleted
  }

  return {
    findOrganizations,
    getOrganizations,
    getOrganization,
    registerOrganization,
    updateOrganization,
    deleteOrganization
  };
};
