const router = require('express').Router();
const userRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/requestsValidation');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth, userRouter);
router.use(auth, articlesRouter);

router.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
