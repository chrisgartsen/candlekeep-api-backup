const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const auth = require('./controllers/auth-controller')

const books = require('./routes/books')
const users = require('./routes/user')

require('./config/env')
require('./config/database').connectDB()

const app = express()

app.use(helmet())
app.use(bodyParser.json())

app.use('/api', auth.verifyToken)
app.use('/api/admin', auth.verifyAdmin)
app.post('/auth/login', auth.login)

app.use('/api/books', books)
app.use('/api/admin/users', users)

app.get('/', (req, res, next) => {
  res.json({version: "0.0.1"})
})

app.use('*', (req, res, next) => {
  res.status(404).json({error: "Page not found"})
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

module.exports = app