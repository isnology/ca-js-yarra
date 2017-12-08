const mongoose = require('./init')
const Schema = mongoose.Schema

const wishListSchema = new Schema ({
  // has one user (belongs to)
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  // has many products
  product: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const WishList = mongoose.model('WishList', wishListSchema)

module.exports = WishList