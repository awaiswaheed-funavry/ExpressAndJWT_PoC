const crypto = require("crypto");
const logger = require("../logger");
const commons = require("../dbOps/common");
const sessionDbOps = require("../dbOps/session");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET =
  "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

exports.isPasswordAndUserMatch = (req, res, next) => {
  logger.print("Login API Called.");
  const usersResponse = commons.getBy("user", "email", req.body.email);
  if (usersResponse) {
    if (typeof usersResponse === String) {
      return res.status(400).send({ errors: ["Invalid email or password"] });
    } else {
      if (usersResponse.length) {
        const user = usersResponse[0];
        let passwordFields = user.password.split("$");
        let salt = passwordFields[0];
        let hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.password)
          .digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            userId: user.id,
            email: user.email,
            permissionLevel: user.permissionLevel,
            provider: "email",
            name: user.name,
          };
          return next();
        } else {
          return res
            .status(400)
            .send({ errors: ["Invalid email or password"] });
        }
      } else {
        return res.status(400).send({ errors: ["Invalid email or password"] });
      }
    }
  } else {
    return res.status(400).send({
      response: "Error in connection with db",
    });
  }
};

exports.login = (req, res) => {
  try {
    let refreshId = req.body.userId + TOKEN_SECRET;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    console.log("Hash: ", hash);
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, TOKEN_SECRET, { expiresIn: "3600s" });
    let b = Buffer.from(hash);
    let refresh_token = b.toString("base64");
    let sessionObj = {
      id: null,
      token: token,
      refreshToken: refresh_token,
      userId: req.body.userId,
    };
    sessionDbOps.insertToDB(sessionObj);
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
