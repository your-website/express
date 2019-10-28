const router = require('express').Router();
const { getUsers, getUser, createUser, changeAbout, changeAvatar } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.patch('/users/me', changeAbout);
router.patch('/users/me/avatar', changeAvatar);

module.exports = router;
