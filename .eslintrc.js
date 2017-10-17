const path = require('path');

module.exports = {
  extends: "airbnb",
  env: {
    mocha: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    'import/resolver': {
      'alias': [
        ['utils', path.join(__dirname, 'src', 'client', 'utils')],
        ['modules', path.join(__dirname, 'src', 'client', 'modules')],
        ['components', path.join(__dirname, 'src', 'client', 'components')],
        ['containers', path.join(__dirname, 'src', 'client', 'containers')],
        ['pages', path.join(__dirname, 'src', 'client', 'app', 'pages')],
      ]
    }
  }
}
