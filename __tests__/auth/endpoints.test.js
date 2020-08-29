const testServer = require('../../utils/testServer');

const baseRoute = '/auth';
const baseMock = 'Auth';
const userId = '5f489a94ec79ea2808e79e38';

let token
describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/auth/routes')
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

    it(`[POST] Error NO TOKEN PROVIDEN`, function(done) {
      request.post(`${baseRoute}/me`)
        .send(userId)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            error: 'NO TOKEN PROVIDEN',
            status: expect.any(Number),
            data: false
          });
          done();
      });
    });

    it(`[POST] /me return user info`, function(done) {
      request.post(`${baseRoute}/me`)
        .set('x-access-token', token)
        .send(userId)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            error: false,
            status: 200,
            data: expect.any(Object)
          });
          done();
      });
    });

    it(`[POST] /login Should return a verifiedData error`, function(done) {
      const register = {
        email: null,
        password: null
      }
      request.post(`${baseRoute}/login`)
        .set('x-access-token', token)
        .send(register)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            errors: expect.any(Array)
          });
          done();
      });
    });

    it(`[POST] /register return error PASSWORD MUST BE EQUAL`, function(done) {
      const register = {
        email: 'alejandro.ortiz2@onevent.xyz',
        password: '1234567',
        confirm_password: '123456',
        user_name: 'Alejandro Ortiz',
        organization_name: 'Devs 101'
      }
      request.post(`${baseRoute}/register`)
        .set('x-access-token', token)
        .send(register)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            errors: expect.any(Array)
          });
          done();
      });
    });

    it(`[POST] /register Should return a verifiedData error`, function(done) {
      const register = {
        email: null,
        password: null,
        confirm_password: null,
        user_name: null,
        organization_name: null
      }
      request.post(`${baseRoute}/register`)
        .set('x-access-token', token)
        .send(register)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            errors: expect.any(Array)
          });
          done();
      });
    });

    xit(`[POST] /register return true`, function(done) {
      const register = {
        email: 'raziel.carvajal@onevent.xyz',
        password: '123456',
        confirm_password: '123456',
        user_name: 'Raziel Carvajal',
        organization_name: 'Devs 101'
      }
      request.post(`${baseRoute}/register`)
        .set('x-access-token', token)
        .send(register)
        .end((err, res) => {
          expect(res.body).toMatchObject({
            error: false,
            status: 201,
            data: expect.any(Object)
          });
          done();
      });
    });

  });
});