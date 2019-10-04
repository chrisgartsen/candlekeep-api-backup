const router = require('express').Router()

const usersController = require('../controllers/users-controller')

router.get('/', usersController.getAll)
router.get('/id', usersController.getOne)
router.post('/', usersController.create)
router.delete('/:id', usersController.delete)
router.put('/:id', usersController.update)

module.exports = router