const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Comicstrip = mongoose.model('Comicstrip', new Schema( {

  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  characters:
  {
    type: [String]
  }
}));

module.exports = Comicstrip;
