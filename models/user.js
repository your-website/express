const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(validate) {
        return validator.isURL(validate);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
