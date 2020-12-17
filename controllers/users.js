const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

const getUserByToken = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;

  User.findById(req.user)
    .orFail(() => new NotFoundError('Такой пользователь не найден'))
    .then((user) => res.send({ data: { email: user.email, name: user.name } }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    if (error) {
      return new Error('Не удалось создать пользователя');
    }
    return User.findOne({ email })
      .then((usr) => {
        if (usr) {
          return next(new ConflictError('Пользователь с таким email уже есть'));
        }
        return User.create(({ email, password: hash, name }))
          .then((user) => res.status(201).send({ message: `Пользователь ${user.name} успешно создан.` }));
      })
      .catch(next);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такой пользователь не найден');
      }

      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET', { expiresIn: '7d' });

      return res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserByToken,
};
