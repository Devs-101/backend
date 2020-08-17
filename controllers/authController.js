const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken')

const { config } = require('../config');


// Ruta para hacer registro
router.post('/register', async (req, res, next) => {
  const errors = []
  const { body: data} = req;
  
  if (data.password !== data.confirm_password){
    errors.push('Password must be equal')
  }
  if (data.password.length < 4) {
    errors.push('Password is less than 3 characters')
  }
  if (errors.length > 0) {
    res.send({errors})
  } else {
    const findEmail = await User.findOne({email: data.email});
    if(findEmail) {
      res.send('Email already exist');
    } else {
      const newUser = new User(req.body);
      await newUser.save();

      const token = jwt.sign({id: newUser._id}, config.jwtSecret, {
        expiresIn: 60 * 60 * 24
      })
      res.status(201).send({success: 'ok', token});
    }
  }
})

// Ruta para hacer signin
router.post('/login', async (req, res, next) => {
  const { body: data } = req;
  const user = await User.findOne({email: data.email});
  if(!user) {
    return res.status(403).send("Unauthorizer");
  }
  const match = await user.validatePassword(data.password);
  if(!match) {
    res.status(401).json({auth: false, token: null, error: 'Email or passwor are wrong'})
  }

  const token = jwt.sign({id: user._id}, config.jwtSecret, {
    expiresIn: 60 * 60 * 24
  })
  res.status(200).send({auth: true, token})
})


// Testin
router.get('/me', verifyToken, async (req, res, next) => {

  
  const user = await User.findById(req.userId, {password: 0});
  if(!user) {
    return res.status(401).send('Unauthorizer');
  }
  res.json(user)
})


module.exports = router;