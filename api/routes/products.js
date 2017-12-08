const express = require('express')
const Product = require('../models/Product')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// read
router.get('/products', requireJWT, (req, res) => {
  Product.find()
  .then((products) => {
    res.json(products)
  })
  .catch((error) => {
    res.json({ error })
  })
})

// create
router.post('/products', requireJWT, (req, res) => {
  Product.create(req.body)
  .then((product) => {
    res.status(201).json(product)
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})



module.exports = router