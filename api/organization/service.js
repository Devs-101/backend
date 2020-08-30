const response = require('../../utils/responses');

function organizationService(storeInjection) {
  const controller = require('./controller')

  let store = storeInjection;

  if (!store) store =  require('../../__mocks__/organizations.mocks').Organizations;

  const Controller = controller(store)
  
  const registerOrganization = async (req, res, next) => {
    const { body: data } = req;

    try {
      const register = await Controller.registerOrganization(data);
      response.success(req, res, register, 201);
    } catch (error) {
      next(error);
    }
  };

  const getAllOrganizations = async (req, res, next) => {
    const { params } = req;
    try {
      const organizations = await Controller.getOrganizations(params.userId)
      response.success(req, res, organizations, 201);
    } catch (error) {
      next(error);
    }
  };

  const getOrganization = async (req, res, next) => {
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
      next(error);
    }
  };

  const updateOrganization = async (req, res, next) => {
    const { params } = req;
    const { body: data } = req;

    try {
      const organizations = await Controller.updateOrganization(params.organizationId, data)
      if (!organizations) response.error(req, res, [{
        "msg": "Organization not found",
        "param": "ORGANIZATION_NOT_FOUND"
      }], 400)

      response.success(req, res, organizations, 200);
    } catch (error) {
      next(error);
    }
  };

  const deleteOrganization = async (req, res, next) => {
    const { params } = req;

    try {
      const organizations = await Controller.deleteOrganization(params.organizationId)
      if (!organizations) response.error(req, res, [{
        "msg": "Organization not found",
        "param": "ORGANIZATION_NOT_FOUND"
      }], 400)

        
      response.success(req, res, organizations, 201);
    } catch (error) {
      next(error);
    }
  };

  return {
    registerOrganization,
    getAllOrganizations,
    getOrganization,
    updateOrganization,
    deleteOrganization
  }
}

module.exports = organizationService;