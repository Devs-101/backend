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
            data: {
              user: {
                _id: '5f489a94ec79ea2808e79e38',
                email: 'walter.salas@onevent.xyz',
                password: '$2a$12$KkJUyzQF2B4thoI92ukkPeo/EQlT0I1iBI1Ovf0KdHcSFKGNAGIk.',
                name: 'Walter Salas'
              },
              organization: {
                _id: '5f42a2b78814a10955374ae4',
                name: 'Vue Conf',
                description: 'The Official Vue.js Conference in the US',
                logo: 'https://us.vuejs.org/_nuxt/img/3a1c375.png',
                userId: '5f489a94ec79ea2808e79e38',
                deleted_at: null
              }
            }
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

    it(`[POST] /register return true`, function(done) {
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