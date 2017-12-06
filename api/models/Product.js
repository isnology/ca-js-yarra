const mongoose = require('./init')

const Product = mongoose.model('Product', {
  brandName: { type: String, required: true },
  name: { type: String, required: true }
})

module.exports = Product