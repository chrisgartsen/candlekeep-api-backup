const router = require('express').Router()

const genresController = require('../controllers/genres-controller')

router.get('/', genresController.getAll)
router.get('/:id', genresController.getOne)
router.post('/', genresController.create)
router.delete('/:id', genresController.delete)
router.put('/:id', genresController.update)

module.exports = router