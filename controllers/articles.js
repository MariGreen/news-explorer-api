const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_REQUEST, NOT_FOUND_ARTICLE, NOT_FOUND_ARTICLES, FORBIDDEN,
} = require('../errors/constants');

const getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .orFail(() => new NotFoundError(NOT_FOUND_ARTICLES))
    .populate('user')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .catch(() => {
      throw new BadRequestError(BAD_REQUEST);
    })
    .then((article) => {
      Article.findById(article._id)
        .populate('owner')
        .orFail(() => new NotFoundError(NOT_FOUND_ARTICLE))
        .then(() => {
          res.status(201).send({
            data: {
              keyword: article.keyword,
              title: article.title,
              text: article.text,
              date: article.date,
              source: article.source,
              link: article.link,
              image: article.image,
            },
          });
        });
    }).catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params._id).populate('owner')
    .orFail(new NotFoundError(NOT_FOUND_ARTICLE))
    .then((article) => {
      if (article.owner._id.toString() === req.user._id.toString()) {
        Article.remove({ _id: article._id })
          .then(() => {
            res.send({
              data: {
                keyword: article.keyword,
                title: article.title,
                text: article.text,
                date: article.date,
                source: article.source,
                link: article.link,
                image: article.image,
              },
            });
          });
      } else {
        throw new ForbiddenError(FORBIDDEN);
      }
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
