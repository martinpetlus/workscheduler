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
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(config.appName),
    }),
  ],
};
