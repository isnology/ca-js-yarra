const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// read list
router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ User: req.user })
  .populate('products')
  .then((wishlist) => {
    if (wishlist) {
      res.json({ products: wishlist.products })
    }
    else {
      // no wishlist created for this user yet so return an empty wishlist
      res.json({ products: [] })
    }
  })
  .catch((error) => {
    res.status(500).json({ error })
  })
})

// add product to wishlist
router.post('/wishlist/products/:productId', requireJWT, (req, res) => {
  const { productId } = req.params
  Wishlist.findOneAndUpdate(
      // find the wishlist for the signed in user
      { user: req.user },
      // make changes (add new entry only once) https://docs.mongodb.com/manual/reference/operator/
      { $addToSet: { products: productId } },
      // options when updating
      { upsert: true , runValidators: true }
    )
    .populate('products')
    .then((wishlist) => {
      res.json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

// remove products from wishlist
router.delete('/wishlist/products/:productId', requireJWT, (req, res) => {
  const { productId } = req.params
  Wishlist.findOneAndUpdate(
      // find the wishlist for the signed in user
      { user: req.user },
      // make changes (add new entry only once) https://docs.mongodb.com/manual/reference/operator/
      { $pull: { products: productId } },
      // options when updating
      { upsert: true , runValidators: true }
  )
  .populate('products')
  .then((wishlist) => {
    res.json({ products: wishlist.products })
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

module.exports = router