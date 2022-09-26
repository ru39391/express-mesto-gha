const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/not-found-err');
const { createUser, login } = require('./controllers/users');
const { errMessageNotFound } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '63287249a0c59df553ba36d0',
  };
  next();
});
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', (req, res, next) => next(new NotFoundError(errMessageNotFound.request)));

app.use(require('./middlewares/errorHandler'));

app.listen(PORT);
