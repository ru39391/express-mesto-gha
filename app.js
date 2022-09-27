const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { errMessageNotFound } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(https?:\/\/)([w\.]{4})?([a-z0-9\.\-]{3,})([a-z]+)([\Wa-z0-9]+)#?/),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError(errMessageNotFound.request)));

app.use(require('./middlewares/errorHandler'));

app.listen(PORT);
