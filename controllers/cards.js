/* eslint-disable linebreak-style */
const Card = require('../models/card');
const {
  actionMessages,
  errMessageNotFound, NOT_FOUND_ERROR_CODE, VALIDATION_ERROR_CODE, BAD_REQUEST_ERROR_CODE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: errMessageNotFound.card });
      }
      return res.send({ message: actionMessages.successRemoved });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: actionMessages.errorId });
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: errMessageNotFound.card });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: actionMessages.errorId });
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: errMessageNotFound.card });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: actionMessages.errorId });
      }
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
    });
};
