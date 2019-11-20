const Cards = require('../models/card');
const { NotFoundError, NotImplemented } = require('../middlewares/errors');

function getCards(req, res, next) {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function deleteCard(req, res, next) {
  Cards.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((cards) => {
      if (req.user._id === cards.owner.toString()) {
        Cards.findByIdAndRemove(req.params.cardId)
          // eslint-disable-next-line consistent-return
          .then((card) => {
            res.send({ data: card });
          })
          .catch(next);
      } else throw new NotImplemented('Можно удалить только свою карточку');
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send({ data: cards });
      }
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send({ data: cards });
      }
    })
    .catch(next);
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
