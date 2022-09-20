const User = require('../models/user');
const {
  actionMessages,
  errMessageNotFound, NOT_FOUND_ERROR_CODE, VALIDATION_ERROR_CODE, BAD_REQUEST_ERROR_CODE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: errMessageNotFound.user });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: actionMessages.errorId });
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message })
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message })
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.updateUserPic = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message })
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};
