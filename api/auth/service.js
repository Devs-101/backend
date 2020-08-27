const response = require('../../utils/responses');

function authService(storeInjection) {
  const controller = require('./controller')
  const organization = require('../organization/controller');
  const jwt = require('jsonwebtoken');

  let store = storeInjection;
  let organizationStore = require('../../models/Organizations');

  if (!store) {
    store = require('../../__mocks__/auth.mocks').Auth;
    organizationStore =  require('../../__mocks__/organizations.mocks').Organizations;
  }

  const Controller = controller(store)
  const Organization = organization(organizationStore)

  const { JWT_SECRET } = require('../../config/index');

  const register = async (req, res) => {
    const { body: data } = req;

    if(data.password !== data.confirm_password) {
      res.status(422).json({errors: [{value: data.confirm_password,
                                    msg: 'Password and confirm must be equals',
                                    param: 'confirm_password'
                                  }]});
    } else {
      try {
        const findEmail = await Controller.isDuplicate(data.email)
      
        if(findEmail) res.status(409).json({ errors: [{
            value: data.email,
            msg: 'Some fields are incorrect.'
          }] })

        const newUser = await Controller.save(req.body)

        if(!newUser) response.error(req, res,[ 'ERROR_NO_NEW_USER_SAVE' ], 400)

        const organizationInfo = {
          name: data.organization_name,
          userId: newUser._id
        }

        const newOrganization = await Organization.register(organizationInfo);
        if (!newOrganization) response.error(req, res,[ 'ERROR_NO_NEW_ORGANIZATION_SAVE' ], 400)

        const token = jwt.sign({id: newUser._id}, JWT_SECRET, { expiresIn: 60 * 60 * 24 })

        response.success(req, res, { user: newUser, organization: newOrganization, token }, 201);
      } catch (error) {
        return error
      }
    }
  }

  const login = async (req, res) => {
    const { body: data } = req;

    try {
      const user = await Controller.isDuplicate(data.email)    
      if(!user) return res.status(403).send('Unauthorizer');

      const match = await Controller.validate(user.password, data.password);
      if(!match) res.status(401).json({ error: 'Wrong password or email. Try again.' })
    
      const token = jwt.sign({id: user._id}, JWT_SECRET, { expiresIn: 60 * 60 * 24 })

      response.success(req, res, { auth: true, token }, 200);
    } catch (error) {
      return error
    }
  }

  const me = async (req, res) => {
    try {
      const user = await Controller.getUserById(req.body.userId);
      const organization = await Organization.getOrganizations(req.body.userId);

      if(!user || !organization) return res.status(401).send('Unauthorizer');
    
      response.success(req, res, { user, organization }, 200);
      
    } catch (error) {
      res.send('Error');
    }
  }

  return {
    register,
    login,
    me
  }
}

module.exports = authService;
