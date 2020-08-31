const testServer = require('../../utils/testServer');

const baseRoute = '/users';
const baseMock = 'Users';
const userId = '5f3c5f7944a4d553acb61740';

describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/user/routes')
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

    it(`[GET] Should return an user of ${baseMock}`, function(done) {
      request.get(`${baseRoute}/${userId}/get`)
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
  });
});