const Path = require('path')
const dotEnvPath = Path.resolve('.env')

require('dotenv').config({path: dotEnvPath})

const express = require('express')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.json())

// routes
server.use([
  require('./routes/products')
])

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting', error)
  }
  else {
    console.log('Server started at http://localhost:7000')
  }
})

