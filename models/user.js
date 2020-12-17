const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INCORRECT } = require('../errors/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: [true, 'Такой пользователь уже зарегистрирован'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name": 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name": 30 символов'],
  },
},

{ versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError({ INCORRECT }));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError({ INCORRECT }));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
