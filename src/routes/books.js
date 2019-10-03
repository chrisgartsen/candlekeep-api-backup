const router = require('express').Router()

const booksController = require('../controllers/books-controller')

const Book = require('../models/book')
const { validateBook } = require('../utils/validations')

router.get('/', async(req, res) => {
  try {
    const books = await Book.find()
    res.status(200).json({books: books })
  } catch(err) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})
  } catch(err) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post('/', booksController.create)

router.delete('/:id', booksController.delete)

module.exports = router