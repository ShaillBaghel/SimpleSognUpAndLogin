const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Config = require("./app/config/config-localhost");
const inItMongo = require("./app/database/index");
const cors = require("cors");

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

    this.app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET,PUT,POST, PATCH, DELETE");
			res.header(
				"Access-Control-Allow-Headers",
				"Content-Type, Authorization, isEncryptedAPI"
			);
			next();
		});
    
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
    this.app.use(cors());
    this.server.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

const app = new Server();
app.appExecute();
