const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/auth");

// List products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (admin only)
router.post("/", protect, admin, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Update product (admin only)
router.put("/:id", protect, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Delete product (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;