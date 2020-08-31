const controller = require('../../api/events/controller')
const { eventsInfo } = require('../../__mocks__/events.mocks')
const Controller = controller()

const baseMock ='Events';
const organizationId = '5f42a2b78814a10955374ae3';
const eventId = '5f3c5f7944a4d553acb61740';

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of objects`, () => {
      return Controller.getEvents().then((events) => {
        expect(events).toStrictEqual(eventsInfo);
      });
    });

    test(`[GET] should return collection of object`, () => {
      return Controller.getEvent(eventId).then((events) => {
        expect(events).toStrictEqual(eventsInfo[0]);
      });
    });

    test(`[UPDATE] should return updated info of ${baseMock}`, () => {
      const data = {
        _id: '5f3c5f7944a4d553acb61740',
        eventStatus: false,
        countDown: true,
        allowRegister: true,
        name: 'Evento Vue',
        description: 'Esto es un super evento de Vue.',
        dateHour: {
          initDate: '2020-08-01T23:30:00.000Z',
          endDate: '2020-08-01T23:30:00.000Z'
        },
        deleted_at: null,
        theme: 'omnitrix',
        slug: 'super-slug-supernew-4',
        fullUrl: 'fullUrl',
        organizators: [],
        organizationId: '5f42a2b78814a10955374ae4'
      }
      return Controller.updateEvent(eventId, data).then((events) => {
        expect(events).toStrictEqual(data);
      });
    });

    test(`[PUBLISH] should return eventStatus TRUE info of ${baseMock}`, () => {
      const data = {
        _id: '5f3c5f7944a4d553acb61740',
        eventStatus: true,
        countDown: true,
        allowRegister: true,
        name: 'Evento Vue',
        description: 'Esto es un super evento de Vue.',
        dateHour: {
          initDate: '2020-08-01T23:30:00.000Z',
          endDate: '2020-08-01T23:30:00.000Z'
        },
        deleted_at: null,
        theme: 'omnitrix',
        slug: 'super-slug-supernew-4',
        fullUrl: 'fullUrl',
        organizators: [],
        organizationId: '5f42a2b78814a10955374ae4'
      }
      return Controller.publishEvent(eventId).then((events) => {
        expect(events).toStrictEqual(data);
      });
    });

    test(`[DELETE] should return object of ${baseMock} with a deleted_at: datetime`, () => {
      const data = {
        _id: '5f3c5f7944a4d553acb61740',
        eventStatus: false,
        countDown: true,
        allowRegister: true,
        name: 'Evento Vue',
        description: 'Esto es un super evento de Vue.',
        dateHour: {
          initDate: '2020-08-01T23:30:00.000Z',
          endDate: '2020-08-01T23:30:00.000Z'
        },
        deleted_at: '2020-08-01T23:30:00.000Z',
        theme: 'omnitrix',
        slug: 'super-slug-supernew-4',
        fullUrl: 'fullUrl',
        organizators: [],
        organizationId: '5f42a2b78814a10955374ae4'
      }
      return Controller.erase(eventId).then((events) => {
        expect(events).toStrictEqual(data);
      });
    });

    test('[CREATE] should return object events created', () => {
      const create = {
        _id: '5f42c4b914b927068cd8523F',
        eventStatus: false,
        countDown: true,
        allowRegister: true,
        name: 'Evento Vue',
        description: 'Esto es un super evento de Vue.',
        dateHour: {
          initDate: '2020-08-01T23:30:00.000Z',
          endDate: '2020-08-01T23:30:00.000Z'
        },
        theme: 'omnitrix',
        slug: 'super-slug-supernew-4',
        fullUrl: 'fullUrl',
        organizators: [],
        organizationId: '5f42a2b78814a10955374ae4'
      };
      return Controller.registerEventSave(create).then((event) => {
        expect(event.data).toStrictEqual(create)
      });
    });
  
  });
});