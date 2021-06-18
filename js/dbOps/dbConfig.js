const Database = require("better-sqlite3");
const dbCon = new Database("db.db");

function createTable() {
  var tables = {
    user: "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, permissionLevel INTEGER)",
    session:
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, token TEXT, refreshToken TEXT)",
  };
  Object.keys(tables).forEach(function (key) {
    var value = tables[key];
    const createTableQuery = dbCon.prepare(
      `CREATE TABLE IF NOT EXISTS ${key} ${value}`
    );
    createTableQuery.run();
  });
}

module.exports = { dbCon: dbCon, createTable: createTable };
