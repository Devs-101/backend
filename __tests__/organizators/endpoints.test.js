const testServer = require('../../utils/testServer')

const baseRoute ='/organizators'
const baseMock ='Organizators'
const eventId = '5f3c5f7944a4d553acb61740';
const organizatorId = '5f4754d764701a63b0484e84';
const organizatorIdFake ='5f42a2b78814a10955374ae55'

let token

describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/organizators/routes')
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
      request.get(`${baseRoute}/${eventId}/`)
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
      request.get(`${baseRoute}/${organizatorId}/get`)
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
      request.get(`${baseRoute}/${organizatorId}99/get`)
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
      request.post(`${baseRoute}/${eventId}/new`)
      .set('x-access-token', token)
      .send(create)
      .end((err, res) => {
        expect(res.body).toMatchObject({
          errors: expect.any(Array)
        });
        done();
      });
    });

    it(`[POST] Should return a organizatorID required error`, function(done) {
      const create = {
        name: 'Organizator 4',
        eventId: '5f3c5f7944a4d553acb61740'
      };
      request.post(`${baseRoute}/${organizatorIdFake}/new`)
      .set('x-access-token', token)
      .send(create)
      .end((err, res) => {
        expect(res.body).toMatchObject({
          error: expect.any(Array),
          status: expect.any(Number),
          data: expect.any(Boolean)
        });
        done();
      });
    });

    it(`[POST] Should return a 201 ${baseMock}`, function(done) {
      const create = {
        name: 'Organizator 4',
        eventId: '5f3c5f7944a4d553acb61740'
      };
      request.post(`${baseRoute}/${eventId}/new`)
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

    it(`[UPDATE] Should return a ERROR ${baseMock}`, function(done) {
      const data = {
        name: 'Organizator 1 UPDATED',
        eventId: '5f3c5f7944a4d553acb61740',
      };
      request.put(`${baseRoute}/${organizatorId}99/update`)
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

    it(`[UPDATE] Should return a updated ${baseMock}`, function(done) {
      const data = {
        name: 'Organizator 1 UPDATED',
        eventId: '5f3c5f7944a4d553acb61740',
      };
      request.put(`${baseRoute}/${organizatorId}/update`)
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
      request.delete(`${baseRoute}/${organizatorId}/delete`)
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

    it(`[DELETE] should return the ERROR of deleted ${baseMock} records`, function(done) {
      request.delete(`${baseRoute}/${organizatorIdFake}123/delete`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body).toStrictEqual({
            data: false,
            error: expect.any(Array),
            status: 403
          });
          done();
      });
    });

  });
});