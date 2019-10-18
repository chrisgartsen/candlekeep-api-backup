const router = require('express').Router()
const isbnController = require('../controllers/isbn-controller')

router.get('/:isbn', isbnController.findBookByIsbn)

module.exports = router