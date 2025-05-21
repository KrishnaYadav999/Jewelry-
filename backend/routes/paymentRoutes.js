const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
require("dotenv").config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  console.log("Received:", req.body);

  const numericAmount = Number(amount);

  if (!numericAmount || isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  const options = {
    amount: numericAmount * 100, // in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: numericAmount,
      currency: "INR",
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// Verify payment
router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Missing payment details" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.status(200).json({ success: true, message: "Payment verified successfully!" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid payment signature" });
  }
});

module.exports = router;
