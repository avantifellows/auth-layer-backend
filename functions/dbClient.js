import config from './config';
const admin = require('firebase-admin');

var serviceAccount = config.appEnv === 'production'
  ? require("./production-service-account-credentials.json")
  : require("./staging-service-account-credentials.json");

admin.initializeApp({credential:admin.credential.cert(serviceAccount), databaseURL: 'https://avantifellows.firebaseio.com'});
const db = admin.firestore()
module.exports = db
