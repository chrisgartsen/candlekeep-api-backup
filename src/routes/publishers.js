const router = require('express').Router()

const publishersController = require('../controllers/publishers-controller')

router.get('/', publishersController.getAll)
router.get('/:id', publishersController.getOne)
router.post('/', publishersController.create)
router.delete('/', publishersController.delete)
router.put('/:id', publishersController.update)

module.exports = router