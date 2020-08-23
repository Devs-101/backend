const User = require('../models/User');
const Organization = require('../models/Organizations');
const jwt = require('jsonwebtoken');


const { JWT_SECRET } = require('../config');

const registerDuplicationDatabase = async (email) => {
  const findEmail = await User.findOne({ email });

  if(findEmail) {
    return true
  }

  return false
}

const registerSave = async (body) => {
  const newUser = new User(body);
  newUser.name = body.user_name
  await newUser.save();

  const newOrganization = new Organization(body);
  const user = await User.findById(newUser._id);
  if(!user) return
  newOrganization.name = body.organization_name;
  newOrganization.userId = user._id
  await newOrganization.save()

  const token = jwt.sign({id: newUser._id}, JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  })
  return {
    data: newUser,
    token
  }
}

const register = async (req, res) => {
  const { body: data } = req;
  if(data.password !== data.confirm_password) {
    res.status(422).json({errors: [{value: data.confirm_password,
                                  msg: 'Password and confirm must be equals',
                                  param: 'confirm_password',
                                  location: 'body'
                                }]});
  } else {
    try {
      const findEmail = await registerDuplicationDatabase(data.email)
    
      if(findEmail) {
        res.status(200).json({ errors: [{
          value: data.email,
          msg: 'Email already exist',
          param: 'email',
          location: 'body'
        }] })
      } else {
        const newUser = await registerSave(req.body)
        res.status(201).send({
          success: true,
          token: newUser.token,
          data: newUser.data,
        });
      }      
    } catch (error) {
      return error
    }
  }
}

const login = async (req, res) => {
  const { body: data } = req;

    try {
      const user = await User.findOne({ email: data.email });
    
      if(!user) {
        return res.status(403).send('Unauthorizer');
      }
      const match = await user.validatePassword(data.password);
      if(!match) {
        res.status(401).json({ error: 'Wrong password or email. Try again.' })
      }
    
      const token = jwt.sign({id: user._id}, JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      })
      res.status(200).send({
        auth: true,
        token
      })
    } catch (error) {
      return error
    }
}

const me = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId, { password: 0 });
    const organization = await Organization.findOne({userId: req.body.userId});
    if(!user) {
      return res.status(401).send('Unauthorizer');
    }
  
    res.status(200).send({
      user,
      organization,
    })
    
  } catch (error) {
    res.send('Error');
  }
}


module.exports = {
  register,
  login,
  me
};