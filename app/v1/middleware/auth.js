const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Config = require("../../config/config-localhost");
const { USER_NOT_LOGGED_IN } = require("./../constants/messages");

const auth = async (req, res, next) => {
  
  try {
  const token = req.header("Authorization").replace("Bearer ", "");

  const decoded = jwt.verify(token, Config.SECRET_KEY);
  
  const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
  if (!user) {
    return res.json({
      error: USER_NOT_LOGGED_IN,
    });
  }
  
  req.user = user;
  req.token = token;
  next();
  } catch (error) {
    
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { auth };
