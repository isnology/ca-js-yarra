const Path = require('path')
const dotEnvPath = Path.resolve('.env')

//require('dotenv').config({path: dotEnvPath})
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./middleware/auth')

const server = express()

server.use(bodyParser.json())
server.use(authMiddleware.initialize)

// routes
server.use([
  require('./routes/products'),
  require('./routes/auth')
])

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting', error)
  }
  else {
    console.log('Server started at http://localhost:7000')
  }
})

