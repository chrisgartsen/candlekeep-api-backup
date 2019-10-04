const Book = require('../models/book')
const { validate, bookSchema } = require('../utils/validations')

module.exports.create = async (req, res, next) => {
  const error = validate(req.body, bookSchema)
  if(error) return res.status(422).json({ error: error.message })
  try {
    const book = await Book.create({
      title: req.body.title
    })
    res.status(201).json({ book: book })
  } catch(err) {
    next(err)
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id })
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})
  } catch(err) {
    next(err)
  }
}

module.exports.getAll = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.status(200).json({ books: books })
  } catch(err) {
    next(err)
  }
}

module.exports.getOne = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})    
  } catch(err) {
    next(err)
  }
}

module.exports.update = async (req, res) => {
  const error = validate(req.body, bookSchema)
  if(error) return res.status(422).json({ error: error.message })
  try {
    const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})
  } catch(err) {
    next(err)
  }
}