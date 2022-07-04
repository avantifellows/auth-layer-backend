const functions = require("firebase-functions");
const db = require("./dbClient");
const { utcToZonedTime } = require("date-fns-tz");

/** Retuns datetime in IST */
const getDateTimeInIST = (date) => {
  return utcToZonedTime(date, "Asia/Kolkata");
};

/** Formats datetime to return only date */
const getCurrentDate = () => {
  const currentDate = getDateTimeInIST(new Date());
  let year = currentDate.getFullYear().toString();
  let month =
    (currentDate.getMonth() + 1 < 9 ? "0" : "") +
    (currentDate.getMonth() + 1).toString();
  let date =
    (currentDate.getDate() + 1 < 9 ? "0" : "") +
    currentDate.getDate().toString();
  return year + "-" + month + "-" + date;
};

/** Checks if session start date and time are valid */
const isStartDateTimeValid = (startDate, startTime) => {
  let currentDate = getCurrentDate();
  let currentDateTime = getDateTimeInIST(new Date());

  if (startDate <= currentDate) {
    return (
      Date.parse(new Date(currentDate + " " + startTime)) <=
      Date.parse(currentDateTime) + 900000
    );
  }
  return false;
};

/** Checks if session end date and time are valid */
const isEndDateTimeValid = (endDate, endTime) => {
  let currentDate = getCurrentDate();
  let currentDateTime = getDateTimeInIST(new Date());

  if (endDate && endDate != "" && endDate >= currentDate) {
    return (
      Date.parse(currentDateTime) <=
      Date.parse(new Date(currentDate + " " + endTime))
    );
  }
  return (
    Date.parse(currentDateTime) <=
    Date.parse(new Date(currentDate + " " + endTime))
  );
};

/** Checks if repeat schedule is valid */
const isRepeatScheduleValid = (repeatSchedule) => {
  if (repeatSchedule && repeatSchedule != "") {
    console.log(repeatSchedule, getDateTimeInIST(new Date()).getDay());
    if (repeatSchedule.type == "weekly") {
      return repeatSchedule.params.includes(
        getDateTimeInIST(new Date()).getDay()
      );
    }
    return false;
  }
  return true;
};

/** Checks if session is turned on */
const isSessionActive = (enabled) => {
  return enabled == 1;
};

/** This function retrieves all session details based on the requested session ID */
exports.getSessionData = functions
  .region("asia-south1")
  .https.onRequest(async (request, response) => {
    response.header("Access-Control-Allow-Headers", "Content-Type");
    response.header("Access-Control-Allow-Origin", "*");

    // Parsing the query parameters from the request
    const params = JSON.parse(Object.keys(request.body)[0]);

    const id = params["sessionId"];

    // Query the details against a specific session ID from the 'Sessions' collection
    result = await db
      .collection("Sessions")
      .where("id", "==", id.toString())
      .get();

    result.forEach((doc) => {
      const sessionData = doc.data();
      let processedData = {};
      if (
        isSessionActive(sessionData.enabled) &&
        isStartDateTimeValid(sessionData.startDate, sessionData.startTime) &&
        isEndDateTimeValid(sessionData.endDate, sessionData.endTime) &&
        isRepeatScheduleValid(sessionData.repeatSchedule)
      ) {
        processedData.sessionActive = true;
        processedData.group = sessionData.group;
        processedData.redirectPlatform = sessionData.redirectPlatform;
        processedData.redirectPlatformParams =
          sessionData.redirectPlatformParams;
        processedData.purpose = sessionData.purpose;
        processedData.purposeParams = sessionData.purposeParams;
      } else {
        processedData.sessionActive = false;
      }

      response.send(processedData);
    });
  });
