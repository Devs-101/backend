const controller = require('../../api/user/controller');

const { usersInfo } = require('../../__mocks__/users.mocks');

const Controller = controller();

const baseMock = 'Users';
const userId = '5f3c5f7944a4d553acb61740';

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[GET] should return specific info of ${baseMock}`, () => {
      return Controller.getUser(userId).then( user => {
        expect(user).toStrictEqual(usersInfo[0])
      })
    });
  });

  test(`[UPDATE] should return updated info of ${baseMock}`, () => {
    const data = {
      name: 'user 99',
      img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
    }
    return Controller.updateUser(userId, data).then((user) => {
      expect(user).toStrictEqual(data);
    });
  });
})