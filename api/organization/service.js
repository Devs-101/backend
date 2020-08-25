const response = require('../../utils/responses');

function organizationService(storeInjection) {
  const controller = require('./controller')

  let store = storeInjection;

  if (!store) {
    store =  require('../../__mocks__/organizations.mocks').Organizations;
  }

  const Controller = controller(store)
  
  const register = async (req, res) => {
    const { body: data } = req;

    try {
      const register = await Controller.register(data);
      response.success(req, res, register, 201);
    } catch (error) {
      response.error(req, res, error, 422);
    }
  };

  const readAll = async (req, res) => {
    const { body: data } = req;
    try {
      const organizations = await Controller.getOrganizations(data.userId)
      response.success(req, res, organizations, 201);
    } catch (error) {
      response.error(req, res, error.errors, 400)
    }
  };

  const read = async (req, res) => {
    const { params } = req;

    try {
      const organizations = await Controller.getOrganization(params.organizationId)
      if (organizations) {
        response.success(req, res, organizations, 201);
      } else {
        response.error(req, res, [{
          "msg": "Organization not found",
          "param": "ORGANIZATION_NOT_FOUND"
        }], 400)
      }
    } catch (error) {
      response.error(req, res, error.errors, 400)
    }
  };


  const update = async (req, res) => {
    const { params } = req;
    const { body: data } = req;

    try {
      const organizations = await Controller.update(params.organizationId, data)
      if (organizations) {
        response.success(req, res, organizations, 200);
  const erase = async (req, res) => {
    const { params } = req;

    try {
      const organizations = await Controller.erase(params.organizationId)
      if (organizations) {
        response.success(req, res, organizations, 201);
      } else {
        response.error(req, res, [{
          "msg": "Organization not found",
          "param": "ORGANIZATION_NOT_FOUND"
        }], 400)
      }
    } catch (error) {
      response.error(req, res, error.errors, 400)
    }
  };

  return {
    register,
    readAll,
    read,
    update
    erase
  }
}

module.exports = organizationService;