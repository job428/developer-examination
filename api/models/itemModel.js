const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  description: String,
});

module.exports = mongoose.model('Item', itemSchema);