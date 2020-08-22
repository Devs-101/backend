const testServer = require('../../utils/testServer')

const baseRoute ='/attendees'
const baseMock ='Attendees'

describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/attendees/routes')
  const request = testServer(route);

  describe(`Routes ${baseMock}`, function () {
    it('[GET] Should return a collection of ${baseMock}', function(done) {
      request.get(baseRoute).end((err, res) => {
        expect(res.body).toMatchObject({
          success: expect.any(Boolean),
          data: expect.any(Object),
          route: expect.any(String)
        });
        done();
      });
    });

    it('[POST] Should return a 201 ${baseMock}', function(done) {
      const createAttendee = {
        _id: '5f3c5f4ada6bed0ff0d50699',
        email: 'juan_pablo@gmail.com',
        eventId: '5f3c5f7944a4d553acb61799'
      }
      request.post(baseRoute).send(createAttendee).end((err, res) => {
        expect(res.body).toMatchObject({
          success: expect.any(Boolean),
          data: expect.any(Object),
          route: expect.any(String)
        });
        done();
      });
    });

    it('[GET] Should return a 200 with ONE ${baseMock} info', function(done) {
      request.get(`${baseRoute}/1`).expect(200, done);
    });

  });
});