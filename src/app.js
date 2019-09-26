const express = require('express')
const bodyParser = require('body-parser')

const auth = require('./routes/auth')
const books = require('./routes/books')

require('./config/env')
require('./config/database').connectDB()

const app = express()

app.use(bodyParser.json())

app.use('/auth', auth)
app.use('/api/books', books)

app.get('/', (req, res, next) => {
  res.json({version: "0.0.1"})
})

module.exports = app