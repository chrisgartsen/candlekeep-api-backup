const express = require('express')

const auth = require('./routes/auth')

require('./config/env')
require('./config/database')

const app = express()

app.use('/auth', auth)

app.get('/', (req, res, next) => {
  res.json({version: "0.0.1"})
})

module.exports = app