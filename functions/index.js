const functions = require("firebase-functions");
const Sentry = require("@sentry/serverless");
const config = require('./config');
const user = require("./user");
const group = require("./group");
const session = require("./session");

Sentry.GCPFunction.init({
  dsn: config.sentryDsn,
  tracesSampleRate: 1.0,
  environment: config.appEnv,
});

const httpRequestHandler = (name, callback) => functions.region("asia-south1").https.onRequest(
  // wrap the callback function with Sentry's http handler
  // this allows Sentry to capture any errors that occur and report to Sentry dashboard
  Sentry.GCPFunction.wrapHttpFunction(async (request, response) => {

    // set sentry context to send custom attributes to the dashboard
    Sentry.setContext('Function context', {
      function: name,
      operation: 'httpRequestHandler',
    });

    try {
      return await callback(request, response);
    } catch (error) {
      Sentry.captureException(error);
      response.status(500).send(`Internal error: ${error.message}`);
    }
  })
);

exports.checkForUser = httpRequestHandler('checkForUser', user.checkForUser);
exports.getGroupData = httpRequestHandler('getGroupData', group.getGroupData);
exports.getSessionData = httpRequestHandler('getSessionData', session.getSessionData);
