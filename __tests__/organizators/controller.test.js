const controller = require('../../api/organizators/controller');

const { organizatorsInfo } = require('../../__mocks__/organizators.mocks');

const Controller = controller();

const baseMock = 'Organizators';
const eventId = '5f3c5f7944a4d553acb61740';
const organizatorId = '5f4754d764701a63b0484e84';

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of ${baseMock}`, () => {
      return Controller.getOrganizators(eventId).then((organizators) => {
        expect(organizators).toStrictEqual(organizatorsInfo);
      });
    });

    test(`[GET] should return specific info of ${baseMock}`, () => {
      return Controller.getOrganizator(organizatorId).then((organizator) => {
        expect(organizator).toStrictEqual(organizatorsInfo[0]);
      });
    });

    test(`[UPDATE] should return updated info of ${baseMock}`, () => {
      const data = {
        name: 'Organizator 99',
        eventId: '5f3c5f7944a4d553acb61740',
        img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
      }
      return Controller.updateOrganizator(organizatorId, data).then((organizator) => {
        expect(organizator).toStrictEqual(data);
      });
    });

    test(`[DELETE] should return the number of deleted ${baseMock} records`, () => {
      return Controller.deleteOrganizator(organizatorId).then((organizator) => {
        expect(organizator).toStrictEqual(1);
      });
    });

    test(`[REGISTER] should return a new organizator ${baseMock} saved`, () => {
      const data = {
        name: 'Organizator 007',
        eventId: '5f3c5f7944a4d553acb61740',
        img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
      }
      return Controller.registerOrganizator(data).then((organizator) => {
        expect(organizator.data).toStrictEqual(data);
      });
    });
  });
});