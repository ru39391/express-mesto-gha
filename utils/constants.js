const VALIDATION_ERROR_CODE = 400;
const AUTH_ERROR_CODE = 401;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const BAD_REQUEST_ERROR_CODE = 500;

const errMessageNotFound = {
  user: 'Пользователь не найден',
  card: 'Карточки с таким ID не существует',
  request: 'Такого ресурса не существует',
};

const actionMessages = {
  successRemoved: 'Карточка удалена',
  successAuth: 'Авторизация прошла успешно',
  errorId: 'Некорректный формат ID объекта',
  errorRequest: 'На сервере произошла ошибка',
  errorAuth: 'Неправильные почта или пароль',
  errorLogin: 'Необходима авторизация',
  errorUser: 'Пользователь с таким e-mail уже существует',
};

module.exports = {
  actionMessages,
  errMessageNotFound,
  VALIDATION_ERROR_CODE,
  AUTH_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
};
