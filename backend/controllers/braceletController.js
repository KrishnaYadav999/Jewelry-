// controllers/braceletController.js
const Bracelet = require('../models/Bracelet');

// GET all bracelets
exports.getAllBracelets = async (req, res) => {
  try {
    const bracelets = await Bracelet.find(); // Fetch all bracelets from the database
    res.json({ bracelets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bracelets', error });
  }
};

// POST a new bracelet
exports.addBracelet = async (req, res) => {
  try {
    // Create a new bracelet from the request body
    const newBracelet = new Bracelet(req.body);

    // Save the bracelet to the database
    await newBracelet.save();

    // Send a response back with the created bracelet
    res.status(201).json({ message: 'Bracelet added successfully', bracelet: newBracelet });
  } catch (error) {
    res.status(400).json({ message: 'Error adding bracelet', error });
  }
};
