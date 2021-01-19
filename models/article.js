const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле "keyword" должно быть заполнено'],
  },
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  publishedAt: {
    type: String,
    required: [true, 'Поле "publishedAt" должно быть заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле "source" должно быть заполнено'],
  },
  url: {
    type: String,
    required: [true, 'Поле "url" должно быть заполнено'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Поле "link" должно быть валидным url-адресом',
    },
  },
  urlToImage: {
    type: String,
    required: [true, 'Поле "urlToImage" должно быть заполнено'],
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: 'Поле "urlToImage" должно быть валидным url-адресом',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
    default: {},
  },
}, { versionKey: false });

module.exports = mongoose.model('article', articleSchema);
