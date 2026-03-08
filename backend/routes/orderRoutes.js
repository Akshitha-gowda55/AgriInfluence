const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");
const Razorpay = require("razorpay");

// Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Place order
router.post("/", protect, async (req,res)=>{
  const { products, totalPrice } = req.body;

  const options = {
    amount: totalPrice * 100,
    currency: "INR"
  };
  const payment = await instance.orders.create(options);

  const order = await Order.create({ user: req.user.id, products, totalPrice, paymentStatus: "pending" });
  res.json({ order, payment });
});

// Get user orders
router.get("/", protect, async (req,res)=>{
  const orders = await Order.find({ user: req.user.id }).populate("products.product");
  res.json(orders);
});

module.exports = router;