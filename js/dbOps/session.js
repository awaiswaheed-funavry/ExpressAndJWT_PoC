const logger = require("../logger");
const dbConfig = require("./dbConfig");
const db = dbConfig.dbCon;

exports.insertToDB = (sessionObj) => {
  const insertQuery = db.prepare(
    `INSERT INTO session VALUES ($id, $userId, $token, $refreshToken)`
  );
  try {
    var result = insertQuery.run(sessionObj);
    return {
      rowId: result.lastInsertRowid,
    };
  } catch (err) {
    logger.print("Exception caught");
    return {
      response: "unable to add",
    };
  }
};
