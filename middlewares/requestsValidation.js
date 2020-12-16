/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');

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

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    title: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      })
      .message({
        'string.trim': 'Поле "email" должно быть заполнено',
      }),
    text: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "link" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "link" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "link" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "link" должно быть заполнено',
      }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24)
      .messages({
        'string.length': 'Длина поля "_id": 24 символа',
        'string.hex': 'Поле "password" может содержать только hex-символы',
      }),
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
  validateArticle,
};
