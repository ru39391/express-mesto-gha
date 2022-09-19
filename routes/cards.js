const router = require('express').Router();
const { getCards, createCard, removeCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', removeCard);

module.exports = router;
