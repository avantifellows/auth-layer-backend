const functions = require("firebase-functions");
const Sentry = require("@sentry/serverless");
const db = require("./dbClient")
const config = require('./config');

Sentry.GCPFunction.init({
  dsn: config.sentryDsn,
  tracesSampleRate: 1.0,
  environment: config.appEnv,
});

const httpRequestHandler = (name, callback) => functions.https.onRequest(
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

/** This function checks for user in the database */
exports.checkForUser = httpRequestHandler('checkForUser', async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  // Parsing the query parameters from the request
  let params = JSON.parse(Object.keys(request.body)[0])
  console.log(params)

  const id = params["userID"]
  const collection = params["collectionName"]
  const column = params["columnName"]

  // Query all documents matching the id from the requested collection
  result = await db.collection(collection).where(column, '==', id.toString()).get()
  if (result.empty){
    response.send(false)
  }
  else{
    response.send(true)
  }
});

/** This function retrieves all group details based on the requested program */
exports.getGroupData = httpRequestHandler('getGroupData', async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  //Parsing the query parameters from the request
  let params = JSON.parse(Object.keys(request.body)[0])
  console.log(params)

  // Query the details against a specific group name from the 'Groups' collection
  const id = params["group"]

  result = await db.collection('Groups').doc(id.toString()).get()
  if(result.exists){
    response.send(result.data())
  }
});
