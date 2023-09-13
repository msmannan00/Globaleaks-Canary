module.exports = (on, config) => {
  on('task', require('@cypress/code-coverage/task'));

  config = require('@cypress/code-coverage').loadPlugin(config);

  return config;
};