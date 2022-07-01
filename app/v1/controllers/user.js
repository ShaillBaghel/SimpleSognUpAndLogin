const User = require("../models/User");
const {PASSWORD_NOT_MATCH, EMAIL_ALREADY_EXISTS, AUTH_FAILED_EMAIL_NOT_FOUND, AUTH_FAILED_PASSWORD_NOT_MATCH} = require("../constants/messages");

exports.signup = async (req, res) => {
  const { email, password, password2 } = req.body;
  const newuser = new User(req.body);

  if (password != password2)
    return res.status(400).json({ message: PASSWORD_NOT_MATCH });

  User.findOne({ email }, function (err, user) {
    if (user)
      return res.status(400).json({ auth: false, message: EMAIL_ALREADY_EXISTS });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        user: doc,
      });
    });
  });
};

exports.login = async (req, res) => {
  console.log("password", req.body.password);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.json({
        isAuth: false,
        message: AUTH_FAILED_EMAIL_NOT_FOUND,
      });

    user.comparepassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: AUTH_FAILED_PASSWORD_NOT_MATCH,
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.json({
          isAuth: true,
          id: user._id,
          email: user.email,
          tokens: user.tokens,
        });
      });
    });
  });
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    // req.user.tokens = [];
    req.user.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, token: doc.tokens.token });
    });

    
  } catch (e) {
    res.status(400).json({ success: false, e });
  }
};

exports.uploadAvatar = async (req, res) => {
  
  console.log("req.file",req.file, "req.user", req.user);
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.file.path },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(400).json({ success: false, e });
  }
}
