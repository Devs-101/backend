const controller = require('../../api/events/controller')
const { Events, eventsInfo } = require('../../__mocks__/events.mocks')
const Controller = controller(Events)

const baseMock ='Events'

xdescribe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET ALL] should return collection of objects`, () => {
      return Controller.getEvents('5f42a2b78814a10955374ae3').then((events) => {
        expect(events).toStrictEqual(eventsInfo);
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
        talks: [],
        dateHour: {
          initDate: '2020-08-01T23:30:00.000Z',
          endDate: '2020-08-01T23:30:00.000Z'
        },
        theme: 'omnitrix',
        broadcast: [],
        sponsors: [],
        slug: 'super-slug-supernew-4',
        fullUrl: 'fullUrl',
        organizators: [],
        organizationId: '5f42a2b78814a10955374ae4',
        createdAt: '2020-08-23T19:34:17.885Z',
        updatedAt: '2020-08-23T19:34:17.885Z'
      };
      return Controller.registerEventSave(create).then((event) => {
        // console.log('Event::', event.data)
        expect(event.data).toStrictEqual(create)
      });
    });
  
  });
});