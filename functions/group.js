const functions = require("firebase-functions");
const db = require("./dbClient");

/** This function retrieves all group details based on the requested program */
exports.getGroupData = functions
  .region("asia-south1")
  .https.onRequest(async (request, response) => {
    response.header("Access-Control-Allow-Headers", "Content-Type");
    response.header("Access-Control-Allow-Origin", "*");

    // Parsing the query parameters from the request
    const params = JSON.parse(Object.keys(request.body)[0]);

    const id = params["group"];

    // Query the details against a specific group name from the 'Groups' collection
    result = await db.collection("Groups").doc(id.toString()).get();
    if (result.exists) {
      response.send(result.data());
    }
  });