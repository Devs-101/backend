const controller = require('../../api/organization/controller')

const { organizationsInfo } = require('../../__mocks__/organizations.mocks')

const Controller = controller()

const baseMock ='Organizations'
const userId = '5f42a2b78814a10955374ae3'
const organizationId = '5f42a2b78814a10955374ae4'

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of objects`, () => {
      return Controller.getOrganizations(userId).then((organizations) => {
        expect(organizations).toStrictEqual(organizationsInfo);
      });
    });

    test(`[GET] should return only one ${baseMock}`, () => {
      return Controller.getOrganization(organizationId).then((organization) => {
        expect(organization).toStrictEqual(organizationsInfo[0]);
      });
    });

    test(`[GET] should return not found error`, () => {
      return Controller.getOrganization('5f42a2b78814a10955374ae9').then((organization) => {
        expect(organization).toStrictEqual(false);
      });
    });

    test(`[UPDATE] should return updated info of ${baseMock}`, () => {
      const data = {
        name: 'Sevelte Conf 99',
        description: 'The Biggest Svelte Conference Worldwide 99',
      }
      return Controller.updateOrganization(organizationId, data).then((organization) => {
        expect(organization).toStrictEqual(data);
      });
    });

    test(`[DELETE] should return the number of deleted ${baseMock} records`, () => {
      return Controller.deleteOrganization(organizationId).then((organization) => {
        expect(organization).toStrictEqual(organizationsInfo[0]);
      });
    });

    test('[CREATE] should return object events created', () => {
      const create = {
        _id: '5f42a5ec4496161f1192bc99',
        name: 'Sevelte Conf',
        description: 'The Biggest Svelte Conference Worldwide',
        userId: '5f42a2b78814a10955374ae3'
      };
      return Controller.registerOrganization(create).then((organization) => {
        expect(organization.data).toStrictEqual(create)
      });
    });
  
  });
});