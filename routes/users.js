const router = require('express').Router();
const data = require('../data/users');
const { getUser, createUser } = require('../controllers/users');

router.get('/users', getUser);
router.post('/users', createUser);

router.get('/users/:id', (req, res) => {
  let d = false;
  data.forEach(element => {
    if (element['_id'] === req.params.id) {
      d = element;
    }
  });
  if (!d) {
    res.statusCode = 404;
    res.send({ error: 'Такого пользователя нет' });
  } else res.send(d);
});

module.exports = router;
