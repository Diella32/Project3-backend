const db = require("../models");
const Session = db.Session;
console.log("Session model:", Session); // This should log the model definition if imported correctly.

authenticate = (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");

  if (authHeader != null && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);

    // Find the session that matches the token
    Session.findAll({ where: { token: token } })
      .then((data) => {
        if (data.length === 0) {
          // No session found with the provided token
          return res.status(401).send({
            message: "Unauthorized! Invalid Token, Logout and Login again",
          });
        }

        let session = data[0];
        console.log(session.expirationDate);

        if (session.expirationDate >= Date.now()) {
          // Token is valid and has not expired
          next();
        } else {
          // Token has expired
          return res.status(401).send({
            message: "Unauthorized! Expired Token, Logout and Login again",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).send({
          message: "Server error while authenticating the session",
        });
      });
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

const auth = {
  authenticate: authenticate,
};

module.exports = auth;
