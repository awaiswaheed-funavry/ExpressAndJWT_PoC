const Database = require("better-sqlite3");
const crypto = require("crypto");
const db = new Database("db.db");

const tableName = 'user';
const fields = '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, permissionLevel INTEGER)';
const createTableQuery = db.prepare(`CREATE TABLE IF NOT EXISTS ${tableName} ${fields}`);


exports.createTable = () => {
    console.log('Generating table if not exists.');
    createTableQuery.run();
}

exports.insert = (req, res) => {
    const insertQuery = db.prepare(`INSERT INTO user VALUES ($id, $name,$email,$password, $permissionLevel)`);
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.id = null;
    console.log('\n\nBody: ', req.body);
    try {
        var result = insertQuery.run(req.body);
        res.send({
            rowId: result.lastInsertRowid
        });
    } catch (err) {
        console.log('Exception caught');
        res.send({
            response: 'unable to add'
        });
    }

}

exports.getById = (req, res) => {
    const getByIdQuery = db.prepare(`SELECT * FROM user WHERE id = ?`);
    try {
        var result = getByIdQuery.all(req.params.id);
        res.send({
            response: result
        });
    } catch (err) {
        console.log('Exception caught');
        res.send({
            response: 'unable to fetch'
        });
    }
}

exports.getAll = (req, res) => {
    const getAll = db.prepare(`SELECT * FROM user`);
    try {
        var rs = getAll.all();
        res.send({
            result: rs
        });
    } catch (err) {
        console.log('Exception caught');
        res.send({
            response: 'unable to fetch'
        });
    }
}

exports.delete = (req, res) => {
    const delQuery = db.prepare(`DELETE FROM user WHERE id = ?`);
    try {
        var result = delQuery.run(req.params.id);
        res.send({
            response: result.changes === 0 ? "Not found" : "deleted succesfully"
        });
    } catch (err) {
        console.log('Exception caught');
        res.send({
            response: 'unable to delete'
        });
    }
}