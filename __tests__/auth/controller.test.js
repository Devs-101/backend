const controller = require('../../api/auth/controller')

const { authInfo } = require('../../__mocks__/auth.mocks')

const Controller = controller()

const baseMock ='Auth'

describe(`[${baseMock}] FUNCTIONS`, function () {
  describe(`Controller ${baseMock}`, function () {
    test(`[IS DUPLICATED] should return false`, () => {
      return Controller.isDuplicate({ email: 'walter.salas@onevent.xyz' })
        .then((users) => {
          expect(users).toStrictEqual(false);
        });
    });

    test(`[GET USER BY ID] should return user info`, () => {
      return Controller.getUserById({ id: '5f489a94ec79ea2808e79e38' })
        .then((user) => {
          expect(user).toStrictEqual(authInfo[0]);
        });
    });

    test(`[GET USER BY ID] should return false`, () => {
      return Controller.getUserById()
        .then((user) => {
          expect(user).toStrictEqual(false);
        });
    });

    test(`[VALIDATE] should return TRUE`, () => {
      const userPass = '$2a$12$KkJUyzQF2B4thoI92ukkPeo/EQlT0I1iBI1Ovf0KdHcSFKGNAGIk.';
      const getPass = '123456';
      return Controller.validate(userPass, getPass)
        .then((user) => {
          expect(user).toStrictEqual(true);
        });
    });

    test(`[SAVE] should return the same object`, () => {
      const createAttendee = {
        id: '5f3c5f1d0c62e123456f',
        email: 'juanpablo@gmail.com',
        user_name: 'Juan Pablo',
        eventId: '5f3c5f7944a4d553acb61740'
      };
      return Controller.save(createAttendee)
        .then((user) => {
          expect(user.data).toStrictEqual(createAttendee);
        });
    });
  });
});