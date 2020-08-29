const testServer = require('../../utils/testServer');

const baseRoute = '/sponsors';
const baseMock = 'Sponsors';
const eventId = '5f3c5f7944a4d553acb61740'
const sponsorId = '5f448d646fd1395360789a9a'

let token
describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/sponsors/routes')
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

    it(`[GET] Should return a specific ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${sponsorId}/get`)
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
        name: 'Vue',
        url: 'https://vuejs.org/',
        logo: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598328165/zcaxj2eo2havpj0tbwbk.png',
        eventId: '5f42c4b914b927068cd8523d'
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
        url: null
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
        name: 'Vue',
        url: 'https://vuejs.org/'
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
        name: 'Platzi',
        url: 'https://www.platzi.com',
        eventId: '5f42c4b914b927068cd8523d'
      }
      request.put(`${baseRoute}/${sponsorId}/update`)
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
      request.delete(`${baseRoute}/${sponsorId}/delete`)
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