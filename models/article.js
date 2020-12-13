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
  text: {
    type: String,
    required: [true, 'Поле "text" должно быть заполнено'],
  },
  date: {
    type: String,
    required: [true, 'Поле "date" должно быть заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле "source" должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Поле "link" должно быть валидным url-адресом',
    },
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Поле "image" должно быть валидным url-адресом',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" не может быть пустым'],
    select: false,
    default: {},
  },
},
{ versionKey: false });

module.exports = mongoose.model('article', articleSchema);
