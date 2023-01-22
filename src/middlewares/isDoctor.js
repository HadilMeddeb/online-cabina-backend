const jwt = require("jsonwebtoken");
const User = require("../models/user");

function isAdmin(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token 
    const decoded = jwt.verify(token, "jwt-secret");
    // Add user from payload
    req.user = decoded;
    console.log("decoded user from token");

    User.findById({ _id: decoded.id }, (err, user) => {
      if (!user) {
        res.status(400).json({ msg: "user  does not exist" });
      } else {
        if (user.__t === "Doctor") {
          next();
        } else {
          res.status(400).json({ msg: "you are not a Doctor not authorized to get access !" });
        }
      }
    });
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = isAdmin;