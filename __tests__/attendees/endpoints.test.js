const testServer = require('../../utils/testServer');

const baseRoute = '/attendees';
const baseMock = 'Attendees';
const eventId = '5f3c5f7944a4d553acb61740';

let token
describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/attendees/routes')
  const request = testServer(route);

  beforeAll(async (done) =>{
    const userAccess = {
      email: 'walter.salas@onevent.xyz',
      password: '123456'
    }

    const routeLogin = require('../../api/auth/routes');
    const requestLogin = testServer(routeLogin);
    const data = await requestLogin.post('/auth/login/').send(userAccess);
    token = data.body.data.token;
    done();
  })

  describe(`Routes ${baseMock}`, function () {

    it(`[GET] Error NO TOKEN PROVIDEN`, function(done) {
      request.get(`${baseRoute}/${eventId}`)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            error: expect.any(String),
            status: expect.any(Number),
            data: expect.any(Boolean)
          });
          done();
      });
    });

    it(`[GET] Should return a collection of ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${eventId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            error: expect.any(Boolean),
            status: expect.any(Number),
            data: expect.any(Object)
          });
          done();
      });
    });

    it(`[POST] Should return a 201 ${baseMock}`, function(done) {
      const createAttendee = {
        email: 'juan_pablo@gmail.com',
      }
      request.post(`${baseRoute}/${eventId}`)
        .set('x-access-token', token)
        .send(createAttendee).end((err, res) => {
          expect(res.body).toMatchObject({
            error: expect.any(Boolean),
            status: expect.any(Number),
            data: expect.any(Object)
          });
          done();
      });
    });

  });
});