const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  count: Number
});

module.exports = mongoose.model('Product', productSchema);
