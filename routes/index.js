const router = require('express').Router;
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/requestsValidation');

// const articleRouter = require('./articles').router;
const userRouter = require('./users').router;

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/', auth, userRouter);
// router.use('/', auth, articleRouter);

router.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

// app.get('*', () => {
//   throw new NotFoundError('Мы, конечно, ещё поищем, но пока ничего такого не нашлось');
// });
// module.exports = router;
