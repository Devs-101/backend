const controller = require('../../api/organization/controller')

const { Organizations, organizationsInfo } = require('../../__mocks__/organizations.mocks')

const Controller = controller(Organizations)

const baseMock ='Organizations'

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of objects`, () => {
      return Controller.getOrganizations('5f42a2b78814a10955374ae3').then((organizations) => {
        expect(organizations).toStrictEqual(organizationsInfo);
      });
    });

    test(`[GET] should return only one ${baseMock}`, () => {
      return Controller.getOrganization('5f42a2b78814a10955374ae4').then((organization) => {
        expect(organization).toStrictEqual(organizationsInfo[0]);
      });
    });

    test(`[GET] should return not found error`, () => {
      return Controller.getOrganization('5f42a2b78814a10955374ae9').then((organization) => {
        expect(organization).toStrictEqual(false);
      });
    });

    test('[CREATE] should return object events created', () => {
      const create = {
        _id: '5f42a5ec4496161f1192bc99',
        name: 'Sevelte Conf',
        description: 'The Biggest Svelte Conference Worldwide',
        logo: 'https://javascript-conference.com/wp-content/uploads/2020/02/iJS_LDN20_Blog_56509_v1.jpg',
        userId: '5f42a2b78814a10955374ae3',
        createdAt: '2020-08-23T17:09:12.014Z',
        updatedAt: '2020-08-23T17:09:12.014Z'
      };
      return Controller.register(create).then((organization) => {
        expect(organization.data).toStrictEqual(create)
      });
    });
  
  });
});