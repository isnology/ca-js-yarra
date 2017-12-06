const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../models/User')

passport.use(User.createStrategy())

const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = process.env.JWT_ALGORITHM
const jwtExpiresIn =  process.env.JWT_EXPIRESIN

function register(req, res, next) {
  // create a fresh user model
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  // Create the user with the specofic password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error)
      return
    }
    // store thr user so we can access it in our handler
    req.user = user
    next()
  })
}

passport.use(new PassportJwt.Strategy(
  {
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
  },
  // when token verified
  (payload, done)  => {
    //
    User.findById(payload.sub)
    .then((user) => {
      // If user found with Id
      if (user) {
        done(null, user)
      }
      // user not found
      else {
        done(null, false)
      }
    })
    .catch((error) => {
      // there was a failure
      done(error, false)
    })
  }
  ))

function signJWTForUser(req, res) {
  const user = req.user
  const token = JWT.sign(
  // payload
  {
    email: user.email
  },
  jwtSecret,
      {
        algorithm: jwtAlgorithm,
        expiresIn: jwtExpiresIn,
        subject: user._id.toString()
      }
  )

  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}