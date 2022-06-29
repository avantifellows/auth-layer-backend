const functions = require("firebase-functions");
const db = require("./dbClient");

/** This function checks for user in the database */
exports.checkForUser = async (request, response) => {
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Allow-Origin", "*");

  const params = JSON.parse(Object.keys(request.body)[0]);

  // Parsing the query parameters from the request
  const id = params["userID"];
  const collection = params["collectionName"];
  const column = params["columnName"];

  // Query all documents matching the id from the requested collection
  result = await db
    .collection(collection)
    .where(column, "==", id.toString())
    .get();
  if (result.empty) {
    response.send(false);
  } else {
    response.send(true);
  }
};
