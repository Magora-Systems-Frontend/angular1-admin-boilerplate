import _ from "lodash";
import path from "path";

const env = {
  API_ADMIN_URL: "http://url",
  NODE_ENV: "development",
  WEB_PORT: "8086",
  PUBLIC_PATH: "/",
  GOOGLE_API_KEY: "",
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

const {
  NODE_ENV,
  API_PUBLIC_URL,
  API_ADMIN_URL,
  WEB_PORT,
  PUBLIC_PATH,
  GOOGLE_API_KEY
} = process.env;

const app = require("./server");

app.listen(WEB_PORT, () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
