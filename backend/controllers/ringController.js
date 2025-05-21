// controllers/ringController.js
const Ring = require('../models/Ring');

// GET all rings
exports.getAllRings = async (req, res) => {
  try {
    const rings = await Ring.find();
    res.json({ rings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rings', error });
  }
};

// POST a new ring
exports.addRing = async (req, res) => {
  try {
    const newRing = new Ring(req.body);
    await newRing.save();
    res.status(201).json({ message: 'Ring added successfully', ring: newRing });
  } catch (error) {
    res.status(400).json({ message: 'Error adding ring', error });
  }
};
