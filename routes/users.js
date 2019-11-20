const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, changeAbout, changeAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), changeAbout);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required(),
  }),
}), changeAvatar);

module.exports = router;
