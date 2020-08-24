const testServer = require('../../utils/testServer')
// const routeLogin = require('../../routes/authRoutes');

const baseRoute ='/events'
const baseMock ='Events'

let token

describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/events/routes')
  // const { Events } = require('../../__mocks__/events.mocks')
  const request = testServer(route);

  describe(`Routes ${baseMock}`, function () {
    /*
    beforeAll(async (done) =>{
      const userAccess = {
        email: 'razier2rww22@gmail.com',
        password: '123456'
      }
      const requestLogin = testServer(routeLogin);
      //const data = await requestLogin.post('/auth/login/').send(userAccess)
      //console.log('data:;::: ', data.body)
      //token = data.body.token;
      done();
    })
    */


    it(`[GET] Should return a collection of ${baseMock}`, function(done) {
      request.get(`${baseRoute}/5f42a2b78814a10955374ae4/get`).set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDJhNWVjNDQ5NjE2MWYxMTkyYmNlYiIsImlhdCI6MTU5ODIyMjQ4NywiZXhwIjoxNTk4MzA4ODg3fQ.tOIoDJvlG6Ks0bEgJsq3bi-252ikjAmbUlJgptQUtM4').end((err, res) => {
        expect(res.body).toMatchObject({
          error: expect.any(Boolean),
          status: expect.any(Number),
          data: expect.any(Array)
        });
        done();
      });
    });

    it(`[POST] Should return a 201 ${baseMock}`, function(done) {
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
      request.post(`${baseRoute}/5f42a2b78814a10955374ae4/new`)
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDJhNWVjNDQ5NjE2MWYxMTkyYmNlYiIsImlhdCI6MTU5ODIyMjQ4NywiZXhwIjoxNTk4MzA4ODg3fQ.tOIoDJvlG6Ks0bEgJsq3bi-252ikjAmbUlJgptQUtM4')
      .send(create)
      .end((err, res) => {
        // console.log('res.body:: ', res.body)
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