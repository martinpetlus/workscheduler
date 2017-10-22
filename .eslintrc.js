const path = require('path');

module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    mocha: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, 'webpack.config.js')
      }
    }
  }
};
