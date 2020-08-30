const boom = require('@hapi/boom');
const response = require('./responses')
/*
const Sentry = require("@sentry/node");
const { sentry, dev } = require('../../config/index');

if (sentry.sentryDns && sentry.sentryId) {
  Sentry.init({ dsn: `https://${sentry.sentryDns}@o416099.ingest.sentry.io/${sentry.sentryId}` });
}
*/
function withErrorStack(error, stack) {
  /*
  if (dev) {
    return { ...error, stack };
  }
  */

  return { ...error };
}

function logErrors(err, req, res, next) {
  //Sentry.captureException(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    // console.log('wrapError', err)
    next(response.json({
      error: 'Internal Server Error',
      data: false,
      status: 500
    }));
  }

  next(err);
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = err;
  
  console.log('errorHandler', payload.message)
  res.json(withErrorStack(payload, err.stack));
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
