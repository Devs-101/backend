const controller = require('../../api/attendees/controller')

const { Ateendees, attendeesInfo } = require('../../__mocks__/attendees.mocks')

const Controller = controller(Ateendees)

const baseMock ='Attendees'

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of objects`, () => {
      return Controller.getAttendees().then((attendees) => {
        expect(attendees).toStrictEqual(attendeesInfo);
      });
    });

    test('[CREATE] should return object attendee created', () => {
      const createAttendee = {
        id: '5f3c5f1d0c62e123456f',
        email: 'juanpablo@gmail.com',
        eventId: '5f3c5f7944a4d553acb61740'
      };
      return Controller.createAttendee(createAttendee).then((attendee) => {
        expect(attendee.data).toStrictEqual(createAttendee)
      });
    });
  
  });
});