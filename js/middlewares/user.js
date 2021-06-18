const crypto = require("crypto");
const logger = require("../logger");
const dbOps = require("../dbOps/user");
const commons = require("../dbOps/common");

exports.insert = (req, res) => {
  logger.print("User Insert API Called.");
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.id = null;
  res.send(dbOps.insertToDB(req.body));
};

exports.getById = (req, res) => {
  logger.print("User GetById API Called.");
  res.send(commons.getBy("user", "id", req.params.id));
};

exports.getAll = (req, res) => {
  logger.print("User GetAll API Called.");
  res.send(commons.getAll("user"));
};

exports.delete = (req, res) => {
  logger.print("User Delete API Called.");
  res.send(commons.deletebyId("user", req.params.id));
};
