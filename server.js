const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Config = require("./app/config/config-localhost");
const inItMongo = require("./app/database/index");

class Server {
  constructor() {
    this.app = express();
    this.port = Config.PORT;
    this.server = require("http").Server(this.app);
  }

  includeRoutes() {
    this.app.use("/api/v1", require("./app/v1/routes"));
  }

  appExecute() {
    inItMongo();
    this.includeRoutes();
    this.app.use(express.json());
    // Body-parser middleware
    this.app.use(bodyParser.json({ limit: "200mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "200mb",
        extended: false,
        parameterLimit: 100000,
      })
    );
    this.app.use(cookieParser());
    this.server.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

const app = new Server();
app.appExecute();
