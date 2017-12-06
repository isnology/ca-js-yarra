const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true, // Ensure that all emails are lowercase
  session: false, // disable sessions as we'// use JWT's
})

const User = mongoose.model('User', userSchema)

module.exports = User