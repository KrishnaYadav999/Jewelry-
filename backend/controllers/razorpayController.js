const Razorpay = require("razorpay");
require('dotenv').config();  // Load environment variables from .env file

// Initialize Razorpay instance with keys from environment variables
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Razorpay key ID from .env
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // Razorpay key secret from .env
});

// Function to create a Razorpay order
const createOrder = async (req, res) => {
  const { price } = req.body;

  const options = {
    amount: price * 100,  // Razorpay expects the amount in paise (1 INR = 100 paise)
    currency: "INR",  // Currency is INR
    receipt: `order_rcptid_${Date.now()}`, // Unique receipt ID
  };

  try {
    const order = await instance.orders.create(options);  // Create the order in Razorpay
    res.json({ orderId: order.id, amount: price });  // Return order details to frontend
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });  // Handle error if order creation fails
  }
};

// Function to verify Razorpay payment
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;  // Concatenate order ID and payment ID

  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  // Create a SHA256 HMAC signature
    .update(body.toString())
    .digest('hex');  // Create the signature using Razorpay secret key

  if (expectedSignature === razorpay_signature) {  // Verify if the signatures match
    res.json({ success: true, message: "Payment verified successfully" });  // If matched, payment is verified
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });  // If not matched, return error
  }
};

module.exports = { createOrder, verifyPayment };
