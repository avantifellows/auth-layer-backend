const functions = require("firebase-functions");
const db = require("./dbClient")

/** This function checks for user in the database */
exports.checkForUser = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  /** Parsing the query parameters from the request -> in this case, the userID, documentName, columnName */
  let param = JSON.parse(Object.keys(request.body)[0])

  const id = JSON.stringify(param["userID"])
  const document = JSON.stringify(param["documentName"])
  const column = JSON.stringify(param["columnName"])

  /** Query all documents matching the id from the requested collection  */
  await db.collection(JSON.parse(document)).where(JSON.parse(column), '==', id).get().then((query)  => {
    if (query.empty){
      response.send(false)
    }
    else{
      response.send(true)
    }
  });
});

/** This function retrieves all program details based on the requested program */
exports.getProgramData = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  /** Parsing the query parameters from the request -> in this case, the program name */
  let param = JSON.parse(Object.keys(request.body)[0])

  /** Query the details against a specific program name from the 'Programs' collection */
  const id = JSON.stringify(param["program"])
  await db.collection('Programs').doc(JSON.parse(id)).get().then((query)  => {
    if(query.exists){
      response.send(query.data())
    }
  });
});


