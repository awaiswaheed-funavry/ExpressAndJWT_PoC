const express = require("express");
const userMiddleware = require("./middlewares/user");
const sessionMiddleware = require("./middlewares/session");
const loginMiddleware = require("./middlewares/login");
const logger = require("./logger");
const dbConfig = require("./dbOps/dbConfig");
const auth = require("./middlewares/authorization");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/ping", (req, res) => {
  res.send("RUNNINNNGGGG..");
});

//users
app.post("/users", [userMiddleware.insert]);
app.get("/users/:id", [
  auth.validJWTNeeded,
  auth.minimumPermissionLevelRequired(2),
  userMiddleware.getById,
]);

app.get("/users", [
  auth.validJWTNeeded,
  auth.minimumPermissionLevelRequired(2),
  userMiddleware.getAll,
]);

app.delete("/users/:id", [
  auth.validJWTNeeded,
  auth.minimumPermissionLevelRequired(4),
  userMiddleware.delete,
]);

// sessions
app.get("/sessions/:id", [
  auth.validJWTNeeded,
  auth.minimumPermissionLevelRequired(8),
  sessionMiddleware.getById,
]);
app.get("/sessions", [
  auth.validJWTNeeded,
  auth.minimumPermissionLevelRequired(8),
  sessionMiddleware.getAll,
]);
app.delete("/sessions/:id", [
  auth.validJWTNeeded,
  auth.minimumPermissionLevelRequired(16),
  sessionMiddleware.delete,
]);
app.delete("/sessions", [
  auth.validJWTNeeded,
  auth.minimumPermissionLevelRequired(16),
  sessionMiddleware.deleteAll,
]);

// login
app.post("/login", [
  loginMiddleware.isPasswordAndUserMatch,
  loginMiddleware.login,
]);

dbConfig.createTable();
app.listen(port, () => {
  logger.print(`Listening on port ${port}...`);
});
