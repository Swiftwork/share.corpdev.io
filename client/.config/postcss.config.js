const config = require('@evry/ng-styles/dist/postcss.config.js');

module.exports = ({ file, options, env }) => {
  const base = config({ file, options, env });
  return base;
};
