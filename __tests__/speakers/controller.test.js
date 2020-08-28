const controller = require('../../api/speakers/controller')

const { speakersInfo } = require('../../__mocks__/speakers.mocks');

const Controller = controller()

const baseMock ='Speakers'
const eventId = '5f3c5f7944a4d553acb61740'
const speakerId = '5f4754d764701a63b0484e84'

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of ${baseMock}`, () => {
      return Controller.getSpeakers(eventId).then((speakers) => {
        expect(speakers).toStrictEqual(speakersInfo);
      });
    });

    test(`[GET] should return specific info of ${baseMock}`, () => {
      return Controller.getSpeaker(speakerId).then((speaker) => {
        expect(speaker).toStrictEqual(speakersInfo[0]);
      });
    });

    test(`[UPDATE] should return updated info of ${baseMock}`, () => {
      const data = {
        name: 'Speaker 99',
        twitter: '@speaker99',
        bio: 'Speaker Super Bio 99',
        rol: 'Speaker Super Rol 99',
        eventId: '5f3c5f7944a4d553acb61740',
        img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
      }
      return Controller.updateSpeaker(speakerId, data).then((speaker) => {
        expect(speaker).toStrictEqual(data);
      });
    });

    test(`[DELETE] should return the number of deleted ${baseMock} records`, () => {
      return Controller.deleteSpeaker(speakerId).then((speaker) => {
        expect(speaker).toStrictEqual(1);
      });
    });

    test(`[REGISTER] should return the number of deleted ${baseMock} records`, () => {
      const data = {
        name: 'Speaker 007',
        twitter: '@speaker007',
        bio: 'Speaker Super Bio 007',
        rol: 'Speaker Super Rol 007',
        eventId: '5f3c5f7944a4d553acb61740',
        img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
      }
      return Controller.registerSpeaker(data).then((speaker) => {
        expect(speaker.data).toStrictEqual(data);
      });
    });
  });
});