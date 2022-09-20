const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  errMessageNotFound, NOT_FOUND_ERROR_CODE,
} = require('./utils/constants');

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

app.use('*', (req, res, next) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: errMessageNotFound.request });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});