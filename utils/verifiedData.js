const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('user_name').not().isEmpty().withMessage('Name is required').escape(),
  check('organization_name').not().isEmpty().withMessage('Organization name is required').escape(),
  check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
  check('password').not().isEmpty().withMessage('Password is required').escape(),
  check('confirm_password').not().isEmpty().withMessage('Confirm password is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.valideLogin = [
  check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
  check('password').not().isEmpty().withMessage('Password is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  },
];

exports.validateEvent = [
  check('name').not().isEmpty().withMessage('Event name is required').escape(),
  check('slug').not().isEmpty().withMessage('Slug is required').escape(),
  check('dateHour.initDate').not().isEmpty().isISO8601().withMessage('The event Date is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  }
]

exports.validateOrganization = [
  check('name').not().isEmpty().withMessage('Organization name is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  }
]