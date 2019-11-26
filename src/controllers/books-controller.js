const Book = require('../models/book')
const Author = require('../models/author')
const { validate, bookSchema } = require('../utils/validations')

module.exports.create = async (req, res, next) => {
  const error = validate(req.body, bookSchema)
  if(error) return res.status(422).json({ error: error.message }) 
  if(req.currentUser._id != req.body.user) return res.status(403).json({ error: 'Unauthorised request' }) 

  console.log("CREATING BOOK")

  // Check if the author object has an _id and a name
  // -> yes use this as the author
  // -> no only name - create a new author with this name

  let author

  if(req.body.author) {
    console.log("Author object exists")
    console.log(req.body.author)

    if(req.body.author._id) {
      author = {
        _id: req.body.author._id,
      }
    } else {
      author = await Author.create({
        user: req.body.user,
        name: req.body.author.name 
      })
    }
  } else {
    console.log("Author does not exist")
  }

  try {
    const book = await Book.create({
      user: req.body.user,
      isbn: req.body.isbn,
      title: req.body.title,
      author: author,
      publisher: req.body.publisher,
      genre: req.body.genre,
      language: req.body.language,
      publishedDate: req.body.publishedDate,
      description: req.body.description,
      thumbnail: req.body.thumbnail
    })
    res.status(201).json({ book })
  } catch(err) {
    console.log(err)
    next(err)
  }
}

module.exports.delete = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: userId })
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})
  } catch(err) {
    next(err)
  }
}

module.exports.getAll = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const books = await Book.find({ user: userId} ).populate('author', '_id name')
    res.status(200).json({ books: books })
  } catch(err) {
    next(err)
  }
}

module.exports.getOne = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const book = await Book.findOne({ _id: req.params.id, user: userId }).populate('author')
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({ book: book })    
  } catch(err) {
    next(err)
  }
}

module.exports.update = async (req, res) => {
  const error = validate(req.body, bookSchema)
  if(error) return res.status(422).json({ error: error.message })
  if(req.currentUser._id != req.body.user) return res.status(403).json({ error: 'Unauthorised request' })

  try {
    const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})
  } catch(err) {
    next(err)
  }
}