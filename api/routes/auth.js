const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Register
router.post('/auth/register', authMiddleware.register, authMiddleware.signJWTForUser, (req, res) => {
    res.json({
      user: req.user
    })
  }
)

router.post('/auth', authMiddleware.signIn, authMiddleware.signJWTForUser, (req, res) => {
    res.json({
      user: req.user
    })
  }
)

module.exports = router