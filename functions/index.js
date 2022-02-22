const functions = require("firebase-functions");
const db = require("./dbClient")

/** This function checks for user in the database */
exports.checkForUser = functions.https.onRequest(async (request, response) => {
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

exports.stagingCheckForUser = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  console.log(request.body)

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

/** This function retrieves all group details based on the requested program */
exports.stagingGetGroupData = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  // Query the details against a specific group name from the 'Groups' collection
  const id = request.body["group"]
  console.log("group:", id)

  result = await db.collection('Groups').doc(id.toString()).get()
  if(result.exists){
    response.send(result.data())
  }

});