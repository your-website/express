const router = require('express').Router();
const {
  getUsers, getUser, changeAbout, changeAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', changeAbout);
router.patch('/users/me/avatar', changeAvatar);

module.exports = router;
