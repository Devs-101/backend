const testServer = require('../../utils/testServer');
const { ConsoleReporter } = require('jasmine');

const baseRoute = '/speakers';
const baseMock = 'Speakers';
const eventId = '5f3c5f7944a4d553acb61740'
const speakerId = '5f4754d764701a63b0484e84'

let token
describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/speakers/routes')
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

    it(`[GET] Error NO VALID TOKEN`, function(done) {
      request.get(`${baseRoute}/${eventId}`)
        .set('x-access-token', '123456')
        .end((err, res) => {
          expect(res.body).toMatchObject({ 
            error: expect.any(String),
            status: 401,
            data: false
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

    it(`[GET] Should return a specific ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${speakerId}/get`)
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

    it(`[POST] Should return a 400 Error`, function(done) {
      const data = {
        name: 'Speaker 1',
        twitter: '@speaker1',
        bio: 'Speaker Super Bio 1',
        rol: 'Speaker Super Rol 1',
        eventId: '5f3c5f7944a4d553acb61740',
      }
      request.post(`${baseRoute}/${eventId}2/new`)
        .set('x-access-token', token)
        .send(data).end((err, res) => {
          expect(res.body).toMatchObject({
            data: false,
            error: expect.any(Array),
            status: 400
          });
          done();
      });
    });

    it(`[POST] Should return a verifiedData error`, function(done) {
      const data = {
        name: null,
        twitter: null,
        bio: null,
        rol: null,
      }
      request.post(`${baseRoute}/${eventId}/new`)
        .set('x-access-token', token)
        .send(data).end((err, res) => {
          expect(res.body).toMatchObject({
            errors: expect.any(Array)
          });
          done();
      });
    });

    it(`[POST] Should return a 201 ${baseMock}`, function(done) {
      const data = {
        name: 'Speaker 99',
        twitter: '@speaker99',
        bio: 'Speaker Super Bio 99',
        rol: 'Speaker Super Rol 99',
        eventId: '5f3c5f7944a4d553acb61740',
      }
      request.post(`${baseRoute}/${eventId}/new`)
        .set('x-access-token', token)
        .send(data).end((err, res) => {
          expect(res.body).toMatchObject({
            data: expect.any(Object),
            error: false,
            status: 201
          });
          done();
      });
    });

    it(`[UPDATE] Should return a updated ${baseMock}`, function(done) {
      const data = {
        name: 'Speaker 007',
        twitter: '@speaker007',
        bio: 'Speaker Super Bio 007',
        rol: 'Speaker Super Rol 007',
        eventId: '5f3c5f7944a4d553acb61740',
      }
      request.put(`${baseRoute}/${speakerId}/update`)
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

    it(`[DELETE] should return the number of deleted ${baseMock} records`, function(done) {
      request.delete(`${baseRoute}/${speakerId}/delete`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body).toStrictEqual({
            data: ['DELETED'],
            error: false,
            status: 200
          });
          done();
      });
    });

  });
});