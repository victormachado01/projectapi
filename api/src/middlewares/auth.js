const expressJwt = require("express-jwt");
const User = require('../model/User');
const { secret } = require("../config/secret");

function authorize() {
  return [
    expressJwt({ secret: secret.secret, algorithms: ["HS256"] }),
    (err, req, res, next) => {
      if (err) {
        return res.status(401).json({ message: `Unauthorized: ${err.message}` })
      } else {
        User.findOne({ _id: req.user.id }).then(function (err, user) {
          if (err) {
            res.status(500).json({ error: err })
          } else {
            if (!user) {
              res.json(401).json({ message: "Unauthorized" })
            }
          }
        })
      }
      next();
    },
  ];
}

module.exports = authorize;
