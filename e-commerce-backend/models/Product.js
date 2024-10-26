const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Add category field
  rating: { type: Number, default: 0 },
  description: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Product', ProductSchema);
