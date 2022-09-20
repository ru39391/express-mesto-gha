const NOT_FOUND_ERROR_CODE = 404;
const VALIDATION_ERROR_CODE = 400;
const BAD_REQUEST_ERROR_CODE = 500;

const errMessageNotFound = {
  user: 'Пользователь не найден',
  card: 'Карточки с таким ID не существует'
}

module.exports = {
  errMessageNotFound,
  NOT_FOUND_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE
}; 