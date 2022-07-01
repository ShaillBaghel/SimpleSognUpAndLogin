const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { SECRET_KEY } = require("../../config/config-localhost");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  password2: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    user.password = newHash;
    user.password2 = newHash;
    return next();
  });
};
const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return hash(user, salt, next);
  });
};

//to signup a user
UserSchema.pre("save", function (next) {
  const that = this;
  const SALT_FACTOR = 8;
  if (!that.isModified("password")) {
    return next();
  }
  return genSalt(that, SALT_FACTOR, next);
});

//to login
UserSchema.methods.comparepassword = function (password, cb) {
  console.log("password123", this.password);
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

//generat token for a user
UserSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign({ _id: user._id.toString() }, SECRET_KEY);

  user.tokens = user.tokens.concat({ token: token });
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// find by token
UserSchema.statics.findByToken = function (token, cb) {
  var user = this;
  const decoded = jwt.verify(token, SECRET_KEY);
  jwt.verify(token, SECRET_KEY, function (err, decode) {
    user.findOne(
      { _id: decode._id, "tokens.token": token },
      function (err, user) {
        if (err) return cb(err);

        cb(null, user);
      }
    );
  });
};

//delete token

UserSchema.methods.deleteToken = function (token, cb) {
  var user = this;

  user.update({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("User", UserSchema);
