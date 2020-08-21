const { body, validationResult } = require('express-validator');

function sanitizedData (req, res, next) {
  const rules = [
    body('username').not().isEmpty().withMessage('')
  ]
}