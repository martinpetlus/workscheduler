const path = require('path');
const webpack = require('webpack');
const config = require('./config');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/client/main.js',
    './src/client/index.html',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      utils: path.join(__dirname, 'src', 'client', 'utils'),
      modules: path.join(__dirname, 'src', 'client', 'modules'),
      components: path.join(__dirname, 'src', 'client', 'components'),
      containers: path.join(__dirname, 'src', 'client', 'containers'),
      pages: path.join(__dirname, 'src', 'client', 'app', 'pages'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(config.appName),
    }),
  ],
};
