const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Ваши запросы очень похожи на автоматические (←_←)',
});

module.exports = {
  limiter,
};
