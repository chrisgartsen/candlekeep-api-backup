const router = require('express').Router()

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

router.post('/', async (req, res) => {
  const error = validateBook(req.body)
  if(error) return res.status(422).json({ error: error.details[0].message })

  try {
    const book = await Book.create({
      title: req.body.title
    })
    res.status(201).json({ book: book })
  } catch(err) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete('/:id', async (req, res) => {
  try {

    const book = await Book.findOneAndDelete({ _id: req.params.id })
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})
  } catch(err) {
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router