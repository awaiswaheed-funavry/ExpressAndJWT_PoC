const Database = require("better-sqlite3");
const logger = require("./logger");
const db = new Database("db.db");

exports.createTable = () => {
    const tableName = 'user';
    const fields = '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, permissionLevel INTEGER)';
    const createTableQuery = db.prepare(`CREATE TABLE IF NOT EXISTS ${tableName} ${fields}`);
    createTableQuery.run();
}

exports.insertToDB = (userObj) => {
    const insertQuery = db.prepare(`INSERT INTO user VALUES ($id, $name,$email,$password, $permissionLevel)`);
    try {
        var result = insertQuery.run(userObj);
        return {
            rowId: result.lastInsertRowid
        };
    } catch (err) {
        logger.print('Exception caught');
        return {
            response: 'unable to add'
        };
    }
}

exports.getById = (id) => {
    const getByIdQuery = db.prepare(`SELECT * FROM user WHERE id = ?`);
    try {
        var result = getByIdQuery.all(id);
        return {
            response: result
        };
    } catch (err) {
        logger.print('Exception caught');
        return {
            response: 'unable to fetch'
        }
    }
}

exports.getByEmail = (email) => {
    const getByIdQuery = db.prepare(`SELECT * FROM user WHERE email = ?`);
    try {
        var result = getByIdQuery.all(email);
        return {
            response: result
        };
    } catch (err) {
        logger.print('Exception caught');
        return {
            response: 'unable to fetch'
        }
    }
}

exports.getAll = () => {
    const getAllQuery = db.prepare(`SELECT * FROM user`);
    try {
        var rs = getAllQuery.all();
        return {
            result: rs
        };
    } catch (err) {
        console.log('Exception caught');
        return {
            response: 'unable to fetch'
        };
    }
}

exports.deletebyId = (id) => {
    const delQuery = db.prepare(`DELETE FROM user WHERE id = ?`);
    try {
        var result = delQuery.run(id);
        return {
            response: result.changes === 0 ? "Not found" : "deleted succesfully"
        };
    } catch (err) {
        logger.print('Exception caught');
        return {
            response: 'unable to delete'
        };
    }
}