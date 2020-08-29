module.exports = function (injectedStore) {
  const bcrypt = require('bcryptjs')
  let store = injectedStore;

  if (!store) store = require('../../__mocks__/auth.mocks').Auth;

  const getUserById = async (userId) => {
    const user = await store.findById(userId, { password: 0 });
    return user || false
  }

  const isDuplicate = async (email) => {
    const findEmail = await store.findOne({ email });
    return findEmail || false
  }

  const validate = async (userPass, getPass) => {
    const match = await bcrypt.compare(getPass, userPass);
    return match
  }

  const save = async (body) => {
    console.log(store)
    const newUser = new store(body);
    await newUser.save();
    return newUser
  }

  return {
    getUserById,
    isDuplicate,
    validate,
    save
  };
};
