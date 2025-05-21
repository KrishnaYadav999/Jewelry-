const Razorpay = require("razorpay");
const crypto = require("crypto");
const { razorpayKeyId, razorpayKeySecret } = require("../config/config");

const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
});

// 🟢 CREATE ORDER API
exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert to paise
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log("✅ Order Created:", order);

        res.status(200).json({ success: true, orderId: order.id, amount });
    } catch (error) {
        console.error("❌ Razorpay Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// 🟢 VERIFY PAYMENT API
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", razorpayKeySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }
};
