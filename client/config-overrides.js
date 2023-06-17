const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@Assets': 'src/assets',
    '@Components': 'src/components',
    '@Views': 'src/views',
    '@Config' : 'src/config',
  })(config);
  return config;
};
