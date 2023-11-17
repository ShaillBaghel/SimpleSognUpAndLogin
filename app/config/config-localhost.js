const Config = {}

Config.PORT = 3000;
Config.SECRET_KEY = "secret";
Config.MONGO_URI = 'mongodb://localhost:27017/pocsignin';
Config.APP_CONF_FILE= "/home/gwl/POC/backend/resources/application.yaml";
Config.DIRECTORY_PATH= "/home/gwl/POC/backend/resources";
Config.SITE_ENV="localhost";

module.exports = Config;