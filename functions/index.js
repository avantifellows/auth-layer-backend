const functions = require("firebase-functions");
const db = require("./dbClient")

/** This function checks for user in the database */
exports.checkForUser = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  console.log(request.body)

  // Parsing the query parameters from the request
  const id = request.body["userID"]
  const collection = request.body["collectionName"]
  const column = request.body["columnName"]

  // Query all documents matching the id from the requested collection
  result = await db.collection(collection).where(column, '==', id.toString()).get()
  if (result.empty){
    response.send(false)
  }
  else{
    response.send(true)
  }
});

exports.stagingCheckForUser = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  console.log(request.body)

  // Parsing the query parameters from the request
  const id = request.body["userID"]
  const collection = request.body["collectionName"]
  const column = request.body["columnName"]

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
exports.getGroupData = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  console.log(request.body)

  //Parsing the query parameters from the request
  const id = request.body["group"]

  // Query the details against a specific group name from the 'Groups' collection
  result = await db.collection('Groups').doc(id.toString()).get()
  if(result.exists){
    response.send(result.data())
  }

});

/** This function retrieves all group details based on the requested program */
exports.stagingGetGroupData = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  console.log(request.body)

  //Parsing the query parameters from the request
  const id = request.body["group"]

  // Query the details against a specific group name from the 'Groups' collection
  result = await db.collection('Groups').doc(id.toString()).get()
  if(result.exists){
    response.send(result.data())
  }

});