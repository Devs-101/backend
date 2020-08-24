const testServer = require('../../utils/testServer')

const baseRoute ='/organizations'
const baseMock ='Organization'

describe(`[${baseMock}] ENDPOINTS`, function () {
  jest.setTimeout(10000);

  const route = require('../../api/organization/routes')
  const request = testServer(route);

  describe(`Routes ${baseMock}`, function () {

    it(`[GET] Should return a collection of ${baseMock}`, function(done) {
      request.get(baseRoute).set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDJhNWVjNDQ5NjE2MWYxMTkyYmNlYiIsImlhdCI6MTU5ODIyMjQ4NywiZXhwIjoxNTk4MzA4ODg3fQ.tOIoDJvlG6Ks0bEgJsq3bi-252ikjAmbUlJgptQUtM4').end((err, res) => {
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
        _id: '5f42a5ec4496161f1192bc99',
        name: 'Sevelte Conf',
        description: 'The Biggest Svelte Conference Worldwide',
        logo: 'https://javascript-conference.com/wp-content/uploads/2020/02/iJS_LDN20_Blog_56509_v1.jpg',
        userId: '5f42a2b78814a10955374ae3',
        createdAt: '2020-08-23T17:09:12.014Z',
        updatedAt: '2020-08-23T17:09:12.014Z'
      };
      request.post(baseRoute)
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDJhNWVjNDQ5NjE2MWYxMTkyYmNlYiIsImlhdCI6MTU5ODIyMjQ4NywiZXhwIjoxNTk4MzA4ODg3fQ.tOIoDJvlG6Ks0bEgJsq3bi-252ikjAmbUlJgptQUtM4')
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

  });
});