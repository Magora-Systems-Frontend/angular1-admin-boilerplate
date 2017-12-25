import webpack from "webpack";
import path from "path";
import _ from "lodash";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CommonsChunkPlugin from "webpack/lib/optimize/CommonsChunkPlugin";
import ManifestPlugin from "webpack-manifest-plugin";
import ChunkManifestPlugin from "chunk-manifest-webpack-plugin";
import WebpackChunkHash from "webpack-chunk-hash";
import LiveReloadPlugin from "webpack-livereload-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const {
  NODE_ENV,
  API_PUBLIC_URL,
  API_ADMIN_URL,
  WEB_PORT,
  PUBLIC_PATH,
  GOOGLE_API_KEY
} = process.env;

console.log("webpack env:");
console.log(`NODE_ENV ->  ${NODE_ENV}`);
console.log(`API_ADMIN_URL ->  ${API_ADMIN_URL}`);
console.log(`WEB_PORT ->  ${WEB_PORT}`);
console.log(`PUBLIC_PATH ->  ${PUBLIC_PATH}`);
console.log(`GOOGLE_API_KEY -> ${GOOGLE_API_KEY}`);

const paths = {
  frontend: path.join(__dirname, '../frontend'),
  static: path.join(__dirname, '../frontend/static'),
};

const appEntry = [
  "./index.js"
];

const vendorEntry = [
  path.join(__dirname, "../node_modules/lodash/lodash.min.js"),
  path.join(__dirname, "../node_modules/moment/moment.js"),
  path.join(__dirname, "../node_modules/angular/angular.js"),
  path.join(__dirname, "../node_modules/angular-animate/angular-animate.js"),
  path.join(__dirname, '../node_modules/angular-simple-logger/dist/angular-simple-logger.min.js'),
  path.join(__dirname, "../node_modules/@uirouter/angularjs/release/angular-ui-router.js"),
  path.join(__dirname, "../node_modules/angular-sanitize/angular-sanitize.js"),
  path.join(__dirname, "../node_modules/angular-aria/angular-aria.js"),
  path.join(__dirname, "../node_modules/angular-messages/angular-messages.js"),
  path.join(__dirname, "../node_modules/angular-resource/angular-resource.js"),
  path.join(__dirname, "../node_modules/mgr-validation/src/mgr-validation.js"),
  path.join(__dirname, "../node_modules/angular-loading-bar/src/loading-bar.js"),
  path.join(__dirname, "../node_modules/ng-table/bundles/ng-table.js"),
  path.join(__dirname, "../node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js"),
  path.join(__dirname, "../node_modules/ng-toast/dist/ngToast.js"),
  path.join(__dirname, "../node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js"),
  path.join(__dirname, "../node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js"),
  path.join(__dirname, "../node_modules/angular-date-time-input/src/dateTimeInput.js"),
  path.join(__dirname, "../node_modules/ng-file-upload/dist/ng-file-upload.js"),
  path.join(__dirname, "../node_modules/angular-google-maps/dist/angular-google-maps.js"),
  path.join(__dirname, "../node_modules/ui-select/dist/select.js"),
  path.join(__dirname, "../node_modules/angular-ui-notification/dist/angular-ui-notification.js"),
  path.join(__dirname, "../node_modules/ng-mask/dist/ngMask.js"),

  //path.join(__dirname, "../node_modules/admin-lte/bootstrap/css/bootstrap.css"),
  path.join(__dirname, "../node_modules/admin-lte/dist/css/AdminLTE.css"),
  path.join(__dirname, "../node_modules/admin-lte/dist/css/skins/skin-green.css"),
  path.join(__dirname, "../node_modules/ng-table/bundles/ng-table.css"),
  path.join(__dirname, "../node_modules/ng-toast/dist/ngToast.css"),
  path.join(__dirname, "../node_modules/ng-toast/dist/ngToast-animations.css"),
  path.join(__dirname, "../node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css"),
  path.join(__dirname, "../node_modules/angular-loading-bar/src/loading-bar.css"),
  path.join(__dirname, "../node_modules/ui-select/dist/select.css"),
  path.join(__dirname, "../node_modules/angular-ui-notification/dist/angular-ui-notification.css")
];

let plugins = [];

if (NODE_ENV === "development") {
  plugins = [
    new webpack.DefinePlugin({
      "global.IS_BROWSER": true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_PUBLIC_URL: JSON.stringify(process.env.API_PUBLIC_URL),
        API_ADMIN_URL: JSON.stringify(process.env.API_ADMIN_URL),
        WEB_PORT: JSON.stringify(process.env.WEB_PORT),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
        SYSTEM_DATE_FORMAT: JSON.stringify(process.env.SYSTEM_DATE_FORMAT),
        SERVER_DATE_FORMAT: JSON.stringify(process.env.SERVER_DATE_FORMAT),
        SERVER_TIME_FORMAT: JSON.stringify(process.env.SERVER_TIME_FORMAT),
        SERVER_DATETIME_FORMAT: JSON.stringify(process.env.SERVER_DATETIME_FORMAT),
      }
    }),
    new CommonsChunkPlugin({
      filename: '[name].js',
      names: ['app', 'vendor'],
      minChunks: Infinity
    }),
    new WebpackChunkHash(),
    new ManifestPlugin({
      fileName: 'chunk-manifest.json',
      basePath: '/'
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../common/templates/layout_dev.pug'),
      inject: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new LiveReloadPlugin()
  ];
} else if (NODE_ENV === "build") {
  plugins = [
    new webpack.DefinePlugin({
      "global.IS_BROWSER": true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_ADMIN_URL: JSON.stringify(process.env.API_ADMIN_URL),
        API_PUBLIC_URL: JSON.stringify(process.env.API_PUBLIC_URL),
        WEB_PORT: JSON.stringify(process.env.WEB_PORT),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
        SYSTEM_DATE_FORMAT: JSON.stringify(process.env.SYSTEM_DATE_FORMAT),
        SERVER_DATE_FORMAT: JSON.stringify(process.env.SERVER_DATE_FORMAT),
        SERVER_TIME_FORMAT: JSON.stringify(process.env.SERVER_TIME_FORMAT)
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../common/templates/layout_build.pug'),
      inject: false
    }),
    new CommonsChunkPlugin({
      filename: '[name].js',
      names: ['app', 'vendor'],
      minChunks: Infinity
    }),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

const config = {
  context: paths.frontend,
  name: 'app',
  entry: {
    app: appEntry,
    vendor: vendorEntry
  },
  output: {
    filename: '[name].js',
    publicPath: PUBLIC_PATH,
    path: PUBLIC_PATH
  },
  node: {
    net: 'empty',
    fs: 'empty'
  },
  devtool: NODE_ENV === 'development' ? 'eval' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'ng-annotate-loader',
          'nginject-loader',
          'babel-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /\.(jade|pug)$/,
        use: [
          'apply-loader',
          'pug-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: NODE_ENV === "development"
          ? ["style-loader", "css-loader"]
          : ExtractTextPlugin.extract(['css-loader'])
      }, {
        test: /\.styl$/,
        use: NODE_ENV === "development"
          ? ["style-loader", "css-loader", "stylus-loader"]
          : ExtractTextPlugin.extract(['css-loader', 'stylus-loader']),
        exclude: /node_modules/
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=/static/fonts/[name].[ext]?&limit=10000&minetype=application/font-woff',
      }, {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=/static/fonts/[name].[ext]',
      }, {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=/static/svg/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    'angular': 'angular'
  },
  plugins: plugins
};

export { config };
export default config;
