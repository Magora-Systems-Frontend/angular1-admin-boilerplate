import _ from "lodash";
import path from "path";
import webpack from "webpack";

const env = {
  API_ADMIN_URL: "http://prod url",
  NODE_ENV: "build",
  PUBLIC_PATH: path.join(__dirname, '../public'),
  GOOGLE_API_KEY: "",
  WEB_PORT: "80",
  SYSTEM_DATE_FORMAT: "YYYY-MM-DDTHH:mm:ss",
  SERVER_DATE_FORMAT: "YYYY-MM-DD",
  SERVER_TIME_FORMAT: "HH:mm",
  SERVER_DATETIME_FORMAT: "YYYY-MM-DD HH:mm"
};

_.forEach(env, (value, key) => {
  if (!process.env[key]) {
    process.env[key] = value
  }
});

const webpackConfig = require('./webpack.config.babel.js').config;
const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  console.log(err, stats)
});
//
