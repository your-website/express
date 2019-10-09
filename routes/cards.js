const router = require('express').Router();
const data = require('../data/cards.json');

router.get('/cards', (req, res) => {
  res.send(data);
});

module.exports = router;
