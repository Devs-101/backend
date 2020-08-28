const controller = require('../../api/sponsors/controller')

const { sponsorsInfo } = require('../../__mocks__/sponsors.mocks');

const Controller = controller()

const baseMock ='Sponsors'
const eventId = '5f3c5f7944a4d553acb61740'
const sponsorId = '5f448d646fd1395360789a9a'

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of ${baseMock}`, () => {
      return Controller.getSponsors(eventId).then((sponsors) => {
        expect(sponsors).toStrictEqual(sponsorsInfo);
      });
    });

    test(`[GET] should return specific info of ${baseMock}`, () => {
      return Controller.getSponsor(sponsorId).then((sponsors) => {
        expect(sponsors).toStrictEqual(sponsorsInfo[0]);
      });
    });

    test(`[UPDATE] should return updated info of ${baseMock}`, () => {
      const data = {
        name: 'Platzi',
        url: 'https://www.platzi.com',
        logo: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598328165/zcaxj2eo2havpj0tbwbk.png',
        eventId: '5f42c4b914b927068cd8523d'
      }
      return Controller.updateSponsor(sponsorId, data).then((sponsors) => {
        expect(sponsors).toStrictEqual(data);
      });
    });

    test(`[DELETE] should return the number of deleted ${baseMock} records`, () => {
      return Controller.deleteSponsor(sponsorId).then((sponsors) => {
        expect(sponsors).toStrictEqual(1);
      });
    });

    test(`[REGISTER] should return the number of deleted ${baseMock} records`, () => {
      const data = {
        _id: '5f42c1870d55711698a694cc',
        name: 'Vue',
        url: 'https://vuejs.org/',
        logo: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598328165/zcaxj2eo2havpj0tbwbk.png',
        eventId: '5f42c4b914b927068cd8523d'
      }
      return Controller.registerSponsor(data).then((sponsors) => {
        expect(sponsors.data).toStrictEqual(data);
      });
    });
  });
});