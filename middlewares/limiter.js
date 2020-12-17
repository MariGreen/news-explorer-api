const rateLimit = require('express-rate-limit');
const { LIMITER } = require('../errors/constants');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { LIMITER },
});
