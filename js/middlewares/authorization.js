const jwt = require("jsonwebtoken");
const TOKEN_SECRET =
  "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send({ response: "Only JWT Auth allowed." });
      } else {
        req.jwt = jwt.verify(authorization[1], TOKEN_SECRET);
        return next();
      }
    } catch (err) {
      return res.status(403).send({ response: "exception" });
    }
  } else {
    return res.status(401).send({ response: "no bearer token found" });
  }
};

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    // let user_id = req.jwt.user_id;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send({ response: "Not allowed." });
    }
  };
};
