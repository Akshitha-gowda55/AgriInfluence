// routes/cart.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { protect } = require("../middleware/auth");

// ---------------------
// GET: Get current user's cart
// ---------------------
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
    if (!cart) return res.status(200).json({ message: "Cart is empty" });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------
// POST: Add product to cart
// ---------------------
router.post("/", protect, async (req, res) => {
  const { product, quantity } = req.body;

  if (!product || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, products: [] });
    }

    // Check if product already in cart
    const itemIndex = cart.products.findIndex(p => p.product.toString() === product);

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ product, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------
// DELETE: Remove a product from cart
// ---------------------
router.delete("/:id", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.product.toString() !== req.params.id);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;