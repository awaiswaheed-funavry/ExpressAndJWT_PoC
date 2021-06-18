const logger = require("../logger");
const dbConfig = require("./dbConfig");
const db = dbConfig.dbCon;

exports.insertToDB = (userObj) => {
  const insertQuery = db.prepare(
    `INSERT INTO user VALUES ($id, $name,$email,$password, $permissionLevel)`
  );
  try {
    var result = insertQuery.run(userObj);
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
