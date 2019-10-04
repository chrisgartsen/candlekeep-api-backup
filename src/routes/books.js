const router = require('express').Router()

const booksController = require('../controllers/books-controller')

router.get('/', booksController.getAll)
router.get('/:id', booksController.getOne)
router.post('/', booksController.create)
router.delete('/:id', booksController.delete)
router.put('/:id', booksController.update)

module.exports = router