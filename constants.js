const BAD_REQUEST = 'Переданы некорректные данные';
const NOT_FOUND_ARTICLE = 'Статьи нет в базе';
const NOT_FOUND_USER = 'Такого пользователя не существует';
const FORBIDDEN = 'Можно удалить только свой контент';
const UNAUTHORIZED = 'Необходима авторизация';
const ERROR_CREATE = 'Не удалось создать пользователя';
const CONFILICT = 'Пользователь с таким email уже есть';
const SERVER_ERROR = 'На сервере произошла ошибка';
const LIMITER = 'Ваши запросы очень похожи на автоматические (←_←)';
const INCORRECT = 'Неправильные почта или пароль';

module.exports = {
  BAD_REQUEST,
  NOT_FOUND_ARTICLE,
  NOT_FOUND_USER,
  FORBIDDEN,
  UNAUTHORIZED,
  ERROR_CREATE,
  CONFILICT,
  SERVER_ERROR,
  LIMITER,
  INCORRECT,
};
