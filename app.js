require('dotenv').config();
const express = require('express');

const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { validateUser, validateLogin } = require('./middlewares/requestsValidation');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = require('./middlewares/limiter');

app.use(helmet());
app.use(requestLogger);

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mydiplomadb' } = process.env;

const cardRouter = require('./routes/cards').router;
const userRouter = require('./routes/users').router;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, login);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

// app.listen(PORT);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
