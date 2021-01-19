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
    password: Joi.string().required()
      .messages({
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
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "keyword" должно быть заполнено',
      }),
    title: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "title" должно быть заполнено',
      })
      .message({
        'string.trim': 'Поле "title" должно быть заполнено',
      }),
    description: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    publishedAt: Joi.string().required()
      .messages({
        'any.required': 'Поле "publishedAt" должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Поле "source" должно быть заполнено',
      }),
    url: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "url" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "url" должно быть заполнено',
      }),
    urlToImage: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "urlToImage" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "urlToImage" должно быть заполнено',
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

module.exports = {
  validateUser,
  validateLogin,
  validateId,
  validateCardId,
  validateArticle,
};
