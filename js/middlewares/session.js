const logger = require("../logger");
const commons = require("../dbOps/common");

exports.getById = (req, res) => {
  logger.print("Session GetById API Called.");
  res.send(commons.getBy("session", "id", req.params.id));
};

exports.getAll = (req, res) => {
  logger.print("Session GetAll API Called.");
  res.send(commons.getAll("session"));
};

exports.deleteAll = (req, res) => {
  logger.print("Session DeleteAll API Called.");
  res.send(commons.deleteAll("session"));
};

exports.delete = (req, res) => {
  logger.print("Session Delete API Called.");
  res.send(commons.deletebyId("session", req.params.id));
};
