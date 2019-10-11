const router = require('express').Router()

const authorsController = require('../controllers/authors-controller')

router.get('/', authorsController.getAll)
router.get('/:id', authorsController.getOne)
router.post('/', authorsController.create)
router.delete('/:id', authorsController.delete)
router.put('/:id', authorsController.update)

module.exports = router