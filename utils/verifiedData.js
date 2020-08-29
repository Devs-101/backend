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
  check('dateHour.initDate').not().isEmpty().isISO8601().withMessage('The event Start Date is required'),
  check('dateHour.initDate').custom((value, { req }) => {
    if(new Date() > new Date(req.body.dateHour.initDate)) {
        throw new Error ('Start Date must be more than today');
    }
    return true;
  }),
  check('dateHour.endDate').not().isEmpty().isISO8601().withMessage('The event End Date is required'),
  check('dateHour.endDate').custom((value, { req }) => {
    if(new Date(value) <= new Date(req.body.dateHour.initDate)) {
        throw new Error ('End Date must be more than Start Date');
    }
    return true;
  }),
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
];

exports.validateSponsor = [
  check('name').not().isEmpty().withMessage('Sponsor name is required').escape(),
  check('url').not().isEmpty().withMessage('Url is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  }
];

exports.validateSpeaker = [
  check('name').not().isEmpty().withMessage('Speaker name is required').escape(),
  check('twitter').not().isEmpty().withMessage('twitter is required').escape(),
  check('bio').not().isEmpty().withMessage('bio is required').escape(),
  check('rol').not().isEmpty().withMessage('rol is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  }
];

exports.validateTalk = [
  check('name').not().isEmpty().withMessage('Talk name is required').escape(),
  check('description').not().isEmpty().withMessage('Description name is required').escape(),
  check('initDate').not().isEmpty().isISO8601().withMessage('The talk Date is required'),
  check('durationInMinutes').not().isEmpty().withMessage('Description name is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  }
];

exports.validateBroadcast = [
  check('subject').not().isEmpty().withMessage('Subject is required').escape(),
  check('text').not().isEmpty().withMessage('Text is required').escape(),
  check('img').isEmpty().withMessage('Image is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  }
];

exports.valideAttendees = [
  check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  },
];

exports.validateOrganizator = [
  check('name').not().isEmpty().withMessage('Talk name is required').escape(),
  check('img').isEmpty().withMessage('Image is required').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(403).json({ errors: errors.array()})
    next();
  }
];