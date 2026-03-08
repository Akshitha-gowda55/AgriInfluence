const mongoose = require("mongoose");

const InfluencerSchema = new mongoose.Schema({
  name: String,
  InstagramHandle: String,
  recommendedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  referralLink: String,
  commissionEarned: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Influencer", InfluencerSchema);