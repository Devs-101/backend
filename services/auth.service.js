const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const registerValidation = (email, password, confirm_password) => {
  if(!email || !password || !confirm_password) return 'NO_INFO'

  if (password.length < 4) return 'MUST_BE_COMPLETE'
  if (password !== confirm_password) return 'MUST_BE_EQUAL'

  return false
}

const registerDuplicationDatabase = async (email) => {
  const findEmail = await User.findOne({ email });

  if(findEmail) {
    return 'EMAIL_ALREADY_EXIST'
  }

  return false
}

const registerSave = async (body) => {
  const newUser = new User(body);
  await newUser.save();

  const token = jwt.sign({id: newUser._id}, JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  })
  return {
    data: newUser,
    token
  }
}

const register = async (req, res) => {
  const errors = []
  const { email, password, confirm_password } = req.body;

  const isError = registerValidation(email, password, confirm_password)
  if(isError) errors.push(isError)

  if (errors.length > 0) {
    res.status(200).json({ success: false, errors })
  } else {
    const findEmail = await registerDuplicationDatabase(email)

    if(findEmail) {
      res.status(200).json({ auth: false, token: null, error: findEmail })
    } else {
      const newUser = await registerSave(req.body)
      res.status(201).send({
        success: true,
        token: newUser.token,
        data: newUser.data,
      });
    }
  }
}

const login = async (req, res) => {
  const { body: data } = req;

  const { email, password } = req.body;
  if(!email || !password ) return res.status(403).send('NO_INFO');

  const user = await User.findOne({ email: data.email });

  if(!user) {
    return res.status(403).send('Unauthorizer');
  }
  const match = await user.validatePassword(data.password);
  if(!match) {
    res.status(401).json({
      auth: false,
      token: null,
      error: 'MUST_BE_EQUAL'
    })
  }

  const token = jwt.sign({id: user._id}, JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  })
  res.status(200).send({
    auth: true,
    token
  })
}

const me = async (req, res) => {
  console.log('req.userId ::', req.body)
  const user = await User.findById(req.body.userId, { password: 0 });

  if(!user) {
    return res.status(401).send('Unauthorizer');
  }

  res.status(200).send({
    user
  })
}


module.exports = {
  register,
  login,
  me
};