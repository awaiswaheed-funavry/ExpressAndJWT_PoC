const dbConfig = require("./dbConfig");
const logger = require("../logger");
const db = dbConfig.dbCon;

exports.getBy = (table, key, value) => {
  const getByQuery = db.prepare(`SELECT * FROM ${table} WHERE ${key} = ?`);
  try {
    return getByQuery.all(value);
  } catch (err) {
    logger.print("Exception caught");
    return {
      response: "unable to fetch",
    };
  }
};

exports.getAll = (table) => {
  const getAllQuery = db.prepare(`SELECT * FROM ${table}`);
  try {
    var rs = getAllQuery.all();
    return {
      result: rs,
    };
  } catch (err) {
    console.log("Exception caught");
    return {
      response: "unable to fetch",
    };
  }
};

exports.deletebyId = (table, id) => {
  const delQuery = db.prepare(`DELETE FROM ${table} WHERE id = ${id}`);
  try {
    var result = delQuery.run();
    return {
      response: result.changes === 0 ? "Not found" : "deleted succesfully",
    };
  } catch (err) {
    logger.print("Exception caught");
    return {
      response: "unable to delete",
    };
  }
};

exports.deleteAll = (table) => {
  const delQuery = db.prepare(`DELETE FROM ${table}`);
  try {
    var result = delQuery.run();
    return {
      response: result.changes === 0 ? "Not found" : "deleted succesfully",
    };
  } catch (err) {
    logger.print("Exception caught");
    return {
      response: "unable to delete",
    };
  }
};
