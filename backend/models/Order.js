const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  address1: { type: String, required: true },
  address2: { type: String }, // Optional field
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
