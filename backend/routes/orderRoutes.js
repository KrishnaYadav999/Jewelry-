const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Your order model, ensure it's defined

// POST request to create an order
router.post("/", async (req, res) => {
  try {
    const { productName, price, size, quantity, address1, address2, paymentMethod } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      productName,
      price,
      size,
      quantity,
      address1,
      address2,
      paymentMethod,
    });

    // Save order to the database
    await newOrder.save();

    res.status(201).json({
      success: true,
      order: newOrder, // Return the created order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET request to fetch all orders
router.get("/", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      orders, // Return the list of orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
