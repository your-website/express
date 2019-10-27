const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};


module.exports.createUser = (req, res) => {
  console.log("123" + req.body);
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};