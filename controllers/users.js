const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  UNAUTHORIZED, NOT_FOUND_USER, ERROR_CREATE, CONFILICT,
} = require('../errors/constants');
const { JWT_SECRET } = require('../envconfig');

const SALT_ROUNDS = 10;

const getUserByToken = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError({ UNAUTHORIZED });
  }
  req.user = payload;

  User.findById(req.user)
    .orFail(() => new NotFoundError({ NOT_FOUND_USER }))
    .then((user) => res.send({ data: { email: user.email, name: user.name } }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    if (error) {
      return new Error({ ERROR_CREATE });
    }
    return User.findOne({ email })
      .then((usr) => {
        if (usr) {
          return next(new ConflictError({ CONFILICT }));
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
        throw new NotFoundError({ NOT_FOUND_USER });
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      return res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserByToken,
};
