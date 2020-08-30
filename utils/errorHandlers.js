const boom = require('@hapi/boom');
const response = require('./responses')
const Sentry = require('@sentry/node');
const { SENTRY_DNS, SENTRY_ID } = require('../config/index');

if (SENTRY_DNS && SENTRY_ID) Sentry.init({ dsn: `https://${SENTRY_DNS}@o410557.ingest.sentry.io/${SENTRY_ID}` });

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) next(boom.badImplementation(err));
  next(err);
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = boom.internal();
  res.status(statusCode);
  res.json({ status: statusCode, error: payload.error, message: payload.message, data: false });
}


function notFoundHandler(req, res) {
  const { output: 
    { statusCode, payload } 
  } = boom.notFound();

  response.error(req, res, payload.message, statusCode)
}


module.exports = {
  notFoundHandler,
  logErrors,
  wrapErrors,
  errorHandler
};
