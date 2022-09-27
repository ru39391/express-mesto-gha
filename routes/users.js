const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateUserPic,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(/[a-m0-9]{2,24}/).min(2).max(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(8),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(https?:\/\/)([w\.]{4})?([a-z0-9\.\-]{3,})([a-z]+)([\Wa-z0-9]+)#?/),
  }),
}), updateUserPic);

module.exports = router;
