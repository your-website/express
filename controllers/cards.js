const Cards = require('../models/card');

function getCards(req, res) {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function deleteCard(req, res) {
  Cards.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((cards) => {
      if (req.user._id === cards.owner.toString()) {
        Cards.findByIdAndRemove(req.params.cardId)
          // eslint-disable-next-line consistent-return
          .then((card) => {
            res.send({ data: card });
          })
          .catch((err) => res.status(500).send({ message: err.message }));
      } else return Promise.reject(new Error('Можно удалить только свою карточку'));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function likeCard(req, res) {
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'Такого пользователя нет' });
      } else {
        res.send({ data: cards });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function dislikeCard(req, res) {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'Такого пользователя нет' });
      } else {
        res.send({ data: cards });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
