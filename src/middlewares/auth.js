const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.auth = async (req, res, next) => {
  const token = req.header("auth_token");
  console.log("jwt secret",process.env.JWT_EXPIRE)
     
  
  if (!token) {
    return res.status(401).json({message:"1-Not authorized to access this route try to login again", data:null})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({message:"2-No user found with this id", data:null})
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({message:"3-Not authorized to access this route try to login again"+err, data:null})
  }
};
