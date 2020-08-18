const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken')

const { JWT_SECRET } = require('../config');

/* Ruta para hacer registro
router.post('/register', async (req, res) => {
  const errors = []
  const { email, password, confirm_password } = req.body;

  const isError = register.validation(email, password, confirm_password)
  if(isError) errors.push(isError)

  if (errors.length > 0) {
    res.status(200).json({ success: false, errors })
  } else {
    const findEmail = await register.duplication(email)

    if(findEmail) {
      res.status(200).json({ auth: false, token: null, error: findEmail })
    } else {
      const newUser = await register.save(req.body)
      res.status(201).send({
        success: true,
        token: newUser.token,
        data: newUser.data,
      });
    }
  }
})
*/

// Ruta para hacer signin
router.post('/login', async (req, res) => {
  const { body: data } = req;
  const user = await User.findOne({email: data.email});
  console.log('email:: ', data.email)
  if(!user) {
    return res.status(403).send("Unauthorizer");
  }
  const match = await user.validatePassword(data.password);
  if(!match) {
    res.status(401).json({auth: false, token: null, error: 'Email or passwor are wrong'})
  }

  const token = jwt.sign({id: user._id}, JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  })
  res.status(200).send({auth: true, token})
})


// Testin
router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findById(req.userId, {password: 0});
  if(!user) {
    return res.status(401).send('Unauthorizer');
  }
  res.json(user)
})


module.exports = router;