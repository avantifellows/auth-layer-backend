const functions = require("firebase-functions");
const Sentry = require("@sentry/serverless");
const db = require("./dbClient")

Sentry.GCPFunction.init({
  dsn: "https://771722dede534c528f6a7c41b3c0bf06@o877623.ingest.sentry.io/6178286",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

/** This function checks for user in the database */
exports.checkForUser = functions.https.onRequest(
  Sentry.GCPFunction.wrapHttpFunction(async (request, response) => {
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
  })
);

/** This function retrieves all group details based on the requested program */
exports.getGroupData = functions.https.onRequest(
  Sentry.GCPFunction.wrapHttpFunction(async (request, response) => {
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
  })
);

/** This function checks for user in the database */
exports.stagingCheckForUser = functions.https.onRequest(
  Sentry.GCPFunction.wrapHttpFunction(async (request, response) => {
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
  })
);
