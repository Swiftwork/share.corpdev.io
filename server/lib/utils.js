module.exports.isEmpty = object => Object.keys(object).length === 0;

module.exports.asyncMiddleware = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};
