/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(
        'Поле "email" должно быть валидным email-адресом ',
      )
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().alphanum().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password": 8 символов',
        'string.alphanum': 'Поле "password" может содержать только буквы или цифры',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name": 2 символа',
        'string.max': 'Максимальная длина поля "name": 30 символов',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(
        'Поле "email" должно быть валидным email-адресом ',
      )
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().alphanum().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password": 8 символов',
        'string.alphanum': 'Поле "password" может содержать только буквы или цифры',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const validateCardId = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(8).max(30).required(),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)?(w{3}\.)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?\#?$/).required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().regex(/^(https?:\/\/)?(w{3}\.)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?\#?$/).required(),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateId,
  validateUserUpdate,
  validateUserAvatar,
  validateCard,
  validateCardId,
};
