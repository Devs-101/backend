const testServer = require('../../utils/testServer')
// const routeLogin = require('../../routes/authRoutes');

const baseRoute ='/events'
const baseMock ='Events'
const organizationId = '5f42a2b78814a10955374ae4';
const eventId = '5f3c5f7944a4d553acb61740';
const eventIdNoPublish ='5f42c4ba14b927068cd8523f991'
const organizationIdFake ='5f42a2b78814a10955374ae5'

let token

describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/events/routes')
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
    it(`[GET] Should return a collection of ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${organizationId}/`)
        .set('x-access-token', token)
        .end((err, res) => {
        expect(res.body).toMatchObject({
          error: expect.any(Boolean),
          status: expect.any(Number),
          data: expect.any(Array)
        });
        done();
      });
    });

    it(`[GET] Should return a object of ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${eventId}/get`)
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

    it(`[GET] Should return a NOT FOUND ERROR of ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${eventId}99/get`)
        .set('x-access-token', token)
        .end((err, res) => {
        expect(res.body).toMatchObject({
          error: expect.any(Array),
          status: expect.any(Number),
          data: expect.any(Boolean)
        });
        done();
      });
    });

    it(`[POST] Should return a verifiedData error`, function(done) {
      const create = {
        name: null,
        description: null,
      };
      request.post(`${baseRoute}/${organizationId}/new`)
      .set('x-access-token', token)
      .send(create)
      .end((err, res) => {
        expect(res.body).toMatchObject({
          errors: expect.any(Array)
        });
        done();
      });
    });

    it(`[POST] Should return a organizationID required error`, function(done) {
      const create = {
        name: null,
        description: null,
      };
      request.post(`${baseRoute}/${organizationIdFake}/new`)
      .set('x-access-token', token)
      .send(create)
      .end((err, res) => {
        expect(res.body).toMatchObject({
          errors: expect.any(Array)
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
        dateHour: {
          initDate: '2020-09-01T23:30:00.000Z',
          endDate: '2020-09-10T23:30:00.000Z'
        },
        theme: 'omnitrix',
        slug: 'super-slug-supernew-4',
        fullUrl: 'fullUrl',
        organizators: [],
        organizationId: '5f42a2b78814a10955374ae4',
        createdAt: '2020-08-23T19:34:17.885Z',
        updatedAt: '2020-08-23T19:34:17.885Z'
      };
      request.post(`${baseRoute}/${organizationId}/new`)
      .set('x-access-token', token)
      .send(create)
      .end((err, res) => {
        expect(res.body).toMatchObject({
          error: expect.any(Boolean),
          status: expect.any(Number),
          data: expect.any(Object)
        });
        done();
      });
    });

    it(`[UPDATE] Should return a updated ${baseMock}`, function(done) {
      const data = {
        _id: '5f3c5f7944a4d553acb61740',
        eventStatus: false,
        countDown: true,
        allowRegister: true,
        name: 'Evento Vue',
        description: 'Esto es un super evento de Vue.',
        dateHour: {
          initDate: '2020-09-01T23:30:00.000Z',
          endDate: '2020-09-10T23:30:00.000Z'
        },
        deleted_at: null,
        theme: 'omnitrix',
        slug: 'super-slug-supernew-4',
        fullUrl: 'fullUrl',
        organizators: [],
        organizationId: '5f42a2b78814a10955374ae4'
      }
      request.put(`${baseRoute}/${eventId}/update`)
        .set('x-access-token', token)
        .send(data).end((err, res) => {
          expect(res.body).toMatchObject({
            data: expect.any(Object),
            error: false,
            status: 200
          });
          done();
      });
    });

    it(`[PUBLISH] Should return INCOMPLETE event error ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${eventIdNoPublish}/publish`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            data: expect.any(Boolean),
            error: expect.any(Array),
            status: 400
          });
          done();
      });
    });

    it(`[DELETE] should return the number of deleted ${baseMock} records`, function(done) {
      request.delete(`${baseRoute}/${eventId}/delete`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.deleted_at).toString()
          done();
      });
    });

  });
});