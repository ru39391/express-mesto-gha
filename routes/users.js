/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateUserPic,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserPic);

module.exports = router;
