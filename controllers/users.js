const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Такого пользователя нет' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.changeAbout = (req, res) => {
  console.log(req.body);
  const { about } = req.body;
  User.findByIdAndUpdate({ _id: req.user._id }, { about: about })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Такого пользователя нет' }));
};

module.exports.changeAvatar = (req, res) => {
  const { link } = req.body;
  User.findByIdAndUpdate({ _id: req.user._id }, { avatar: link })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Такого пользователя нет' }));
};
