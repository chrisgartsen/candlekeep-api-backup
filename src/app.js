const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
  res.json({version: "0.0.1"})
})

module.exports = app