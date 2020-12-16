const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .orFail(() => new NotFoundError('Сохранённых статей нет'))
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
      throw new BadRequestError('Переданы некорректные данные');
    })
    .then((article) => {
      Article.findById(article._id)
        .populate('owner')
        .orFail(() => new NotFoundError('Не удалось сохранить статью'))
        .then((item) => {
          res.status(201).send(item);
        });
    }).catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params._id).populate('owner')
    .orFail(new Error('NoArticle'))
    .catch((err) => {
      if (err.message === 'NoArticle') {
        throw new NotFoundError('Статьи нет в базе');
      }
    })
    .then((article) => {
      if (article.owner._id.toString() === req.user._id.toString()) {
        Article.findOneAndDelete({ _id: article._id })
          .then(() => {
            // const { owner, ...restArticle } = article;
            // delete article.owner;
            // // article.toObject();
            // res.status(200).send(restArticle); // тут точно нет поля owner
            res.status(200).send({ data: article });
          });
      } else {
        throw new ForbiddenError('Можно удалить только свой контент');
      }
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
