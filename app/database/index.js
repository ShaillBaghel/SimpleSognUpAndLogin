const mongoose = require("mongoose");

const { MONGO_URI } = require("../config/config-localhost");

module.exports = async () => {
  const connect = () => {
    mongoose.Promise = global.Promise;

    mongoose
      .connect(MONGO_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB successfully connected"))
      .catch((err) => console.log(err));
  };
  connect();

  mongoose.connection.on("error", console.log);
  mongoose.connection.on("disconnected", connect);
};
