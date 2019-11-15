const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  isbn: String,
  title: {
    type: String,
    required: true
  },
  author: String,
  genre: String,
  publisher: String,
  language: String,
  publishedDate: String,
  description: String,
  thumbnail: String
})

module.exports = mongoose.model('Book', bookSchema)