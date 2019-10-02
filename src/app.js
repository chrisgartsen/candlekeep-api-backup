const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const auth = require('./routes/auth')
const books = require('./routes/books')

require('./config/env')
require('./config/database').connectDB()

const app = express()

app.use(helmet())
app.use(bodyParser.json())

app.use('/auth', auth)
app.use('/api/books', books)

app.get('/', (req, res, next) => {
  res.json({version: "0.0.1"})
})

app.use('*', (req, res, next) => {
  res.status(404).json({error: "Page not found"})
})

module.exports = app