const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  rating: { type: Number, default: 0 },
  influencerRecommended: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);