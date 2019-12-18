const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  isbn: String,
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genre: String,
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  language: String,
  publishedDate: String,
  description: String,
  thumbnail: String
})

module.exports = mongoose.model('Book', bookSchema)