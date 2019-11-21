const router = require('express').Router()
const authController = require('../controllers/auth-controller')

router.post('/login', authController.login)

router.post('/signup', (req, res) => {
  res.status(503).json({ message: 'Not yet implemented'})
})

module.exports = router
