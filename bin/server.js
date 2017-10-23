import express from "express";
import path from "path";
import logger from "morgan";
import pug from "pug";
import historyApiFallback from "connect-history-api-fallback";
import webpack from "webpack";
import webpackConfig from "./webpack.config.babel";

const {
  NODE_ENV,
  API_PUBLIC_URL,
  API_ADMIN_URL,
  WEB_PORT,
  PUBLIC_PATH,
	GOOGLE_API_KEY
} = process.env;

const app = express();
const compiler = webpack(webpackConfig);

app.set('port', process.env.WEB_PORT);

app.disable('x-powered-by');

app.engine('pug', pug.__express);

app.use(historyApiFallback({
  verbose: false
}));

app.set("views", path.join(__dirname, "..", "common/templates"));

if (NODE_ENV === 'development') {

  app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: false,
    noInfo: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      modules: false
    }
  }));
}

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, webpackConfig.output.publicPath)));
app.use('/static', express.static(path.join(__dirname, '..', 'frontend/static')));

module.exports = app;