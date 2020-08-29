const testServer = require('../../utils/testServer')

const baseRoute ='/organizations'
const baseMock ='Organization'

const userId = '5f42a2b78814a10955374ae3'
const organizationId = '5f42a2b78814a10955374ae4'

let token
describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/organization/routes')
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
      request.get(`${baseRoute}/${userId}`)
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

    it(`[POST] Should return a verifiedData error`, function(done) {
      const create = {
        name: null,
        description: null,
      };
      request.post(`${baseRoute}/${userId}/new`)
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
        _id: '5f42a5ec4496161f1192bc99',
        name: 'Sevelte Conf',
        description: 'The Biggest Svelte Conference Worldwide',
        logo: 'https://javascript-conference.com/wp-content/uploads/2020/02/iJS_LDN20_Blog_56509_v1.jpg',
        userId: '5f42a2b78814a10955374ae3'
      };
      request.post(`${baseRoute}/${userId}/new`)
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
        _id: '5f42a2b78814a10955374ae4',
        name: 'Vue Conf 007',
        description: 'The Official Vue.js Conference in the US 007',
      }
      request.put(`${baseRoute}/${organizationId}/update`)
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
      request.delete(`${baseRoute}/${organizationId}/delete`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.deleted_at).toString()
          done();
      });
    });

  });
});