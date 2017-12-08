const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ User: req.user })
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

module.exports = router