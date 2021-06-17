const crypto = require("crypto");
const logger = require("./logger");
const dbOps = require("./dbOperations");

exports.createTable = () => {
    logger.print('Generating table if not exists.');
    dbOps.createTable();
}

exports.insert = (req, res) => {
    logger.print("Insert API Called.");
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.id = null;
    res.send(dbOps.insertToDB(req.body));
}

exports.getById = (req, res) => {
    logger.print("GetById API Called.");
    res.send(dbOps.getById(req.params.id));
}

exports.getAll = (req, res) => {
    logger.print("GetAll API Called.");
    res.send(dbOps.getAll());
}

exports.delete = (req, res) => {
    logger.print("Delete API Called.");
    res.send(dbOps.deletebyId(req.params.id));
}