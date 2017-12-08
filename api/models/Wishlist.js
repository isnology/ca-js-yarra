const mongoose = require('./init')
const Schema = mongoose.Schema

const wishlistSchema = new Schema ({
  // has one user (belongs to)
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  // has many products
  product: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist