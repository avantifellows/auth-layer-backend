const functions = require("firebase-functions");
const db = require("./dbClient")

exports.checkForUser = functions.https.onRequest(async (request, response) => {
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Origin', '*');

  //parsing the query parameters from the request -> in this case, the userID
  let param = JSON.parse(Object.keys(request.body)[0])

  //firebase query using where needs a string to compare
  const id = JSON.stringify(param["userID"])
  await db.collection('HaryanaStudents').where('srn_number', '==', id).get().then((query)  => {
    if (query.empty){
      response.send(false)
    }
    else{
      response.send(true)
    }
  });
});

