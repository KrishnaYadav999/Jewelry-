const Order = require("../models/Order"); // Import Order model

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { productName, price, quantity, address1, paymentMethod } = req.body;

    // Validate required fields
    if (!productName || !price || !quantity || !address1 || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new order
    const newOrder = new Order({
      productName,
      price,
      quantity,
      address1,
      paymentMethod,
    });

    // Save to database
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
