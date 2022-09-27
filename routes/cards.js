const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardIdValidationConfig = {
  params: Joi.object().keys({
    cardId: Joi.string().pattern(/[a-f0-9]{24}/).length(24),
  }),
};

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(https?:\/\/)([w\.]{4})?([a-z0-9\.\-]{3,})([a-z]+)([\Wa-z0-9]+)#?/),
  }),
}), createCard);
router.delete('/:cardId', celebrate(cardIdValidationConfig), removeCard);
router.put('/:cardId/likes', celebrate(cardIdValidationConfig), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdValidationConfig), dislikeCard);

module.exports = router;
