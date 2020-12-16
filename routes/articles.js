const articles = require('express').Router();
const {
  validateId,
  validateArticle,
} = require('../middlewares/requestsValidation');

const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

articles.get('/articles', getArticles);

articles.post('/articles', validateArticle, createArticle);

articles.delete('/articles/:_id', validateId, deleteArticle);

module.exports = articles;
