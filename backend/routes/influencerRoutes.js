const express = require("express");
const router = express.Router();
const Influencer = require("../models/Influencer");

// List influencers
router.get("/", async(req,res)=>{
  const influencers = await Influencer.find().populate("recommendedProducts");
  res.json(influencers);
});

// Influencer profile
router.get("/:id", async(req,res)=>{
  const influencer = await Influencer.findById(req.params.id).populate("recommendedProducts");
  res.json(influencer);
});

module.exports = router;