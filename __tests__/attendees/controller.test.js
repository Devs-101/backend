const controller = require('../../api/attendees/controller')
const store = require('../../__mocks__/mocks')

const attendeesMocks = require('../../__mocks__/attendees.mocks')

const Controller = controller(store)

const baseMock ='Attendees'

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of objects`, () => {
      return Controller.getAttendees().then((attendees) => {
        expect(attendees).toStrictEqual(attendeesMocks);
      });
    });  

    test(`[GET] should return object`, () => {
      return Controller.getAttendee('5f3c5f1d0c62e30b5c75a9af').then((attendee) => {
        expect(attendee).toStrictEqual(attendeesMocks[0]);
      });
    });

    test('[CREATE] should return object attendee created', () => {
      const createAttendee = {
        id: '5f3c5f1d0c62e123456f',
        email: 'juanpablo@gmail.com',
        eventId: '5f3c5f7944a4d553acb61740'
      };
      return Controller.createAttendee(createAttendee).then((attendee) => {
        expect(attendee).toStrictEqual(createAttendee)
      });
    });
  
  });
});