/* eslint-disable linebreak-style */
const NOT_FOUND_ERROR_CODE = 404;
const VALIDATION_ERROR_CODE = 400;
const BAD_REQUEST_ERROR_CODE = 500;

const errMessageNotFound = {
  user: 'Пользователь не найден',
  card: 'Карточки с таким ID не существует',
  request: 'Такого ресурса не существует',
};

const actionMessages = {
  successRemoved: 'Карточка удалена',
  errorId: 'Некорректный формат ID объекта',
  errorRequest: 'На сервере произошла ошибка'
};

module.exports = {
  actionMessages,
  errMessageNotFound,
  NOT_FOUND_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
};
