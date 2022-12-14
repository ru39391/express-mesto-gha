const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const AuthError = require('../errors/auth-err');
const { actionMessages, errMessageValidation, patterUrl } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, errMessageValidation.required],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: errMessageValidation.email,
    },
  },
  password: {
    type: String,
    required: [true, errMessageValidation.required],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, errMessageValidation.min],
    maxlength: [30, errMessageValidation.max],
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, errMessageValidation.min],
    maxlength: [30, errMessageValidation.max],
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => patterUrl.test(value),
      message: errMessageValidation.url,
    },
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(actionMessages.errorAuth));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(actionMessages.errorAuth));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
