const admin = require('firebase-admin');

var serviceAccount = require("$PATH_TO_SERVICE_ACCOUNTS_CREDENTIALS");
admin.initializeApp({credential:admin.credential.cert(serviceAccount), databaseURL: 'https://avantifellows.firebaseio.com'});
const db = admin.firestore()
module.exports = db
