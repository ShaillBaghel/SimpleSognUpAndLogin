"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var Config = require("./app/config/config-localhost");
var inItMongo = require("./app/database/index");
var cors = require("cors");
var Server = /*#__PURE__*/function () {
  function Server() {
    _classCallCheck(this, Server);
    this.app = express();
    this.port = Config.PORT;
    this.server = require("http").Server(this.app);
  }
  _createClass(Server, [{
    key: "includeRoutes",
    value: function includeRoutes() {
      this.app.use("/api/v1", require("./app/v1/routes"));
    }
  }, {
    key: "appExecute",
    value: function appExecute() {
      var _this = this;
      inItMongo();
      this.app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST, PATCH, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, isEncryptedAPI");
        next();
      });
      this.includeRoutes();
      this.app.use(express.json());
      // Body-parser middleware
      this.app.use(bodyParser.json({
        limit: "200mb"
      }));
      this.app.use(bodyParser.urlencoded({
        limit: "200mb",
        extended: false,
        parameterLimit: 100000
      }));
      this.app.use(cookieParser());
      this.app.use(cors());
      this.server.listen(this.port, function () {
        console.log("App listening on port ".concat(_this.port));
      });
    }
  }]);
  return Server;
}();
var app = new Server();
app.appExecute();
