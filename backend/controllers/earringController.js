// controllers/earringController.js
const Earring = require('../models/Earring');

// GET all earrings
exports.getAllEarrings = async (req, res) => {
  try {
    const earrings = await Earring.find();
    res.json({ earrings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching earrings', error });
  }
};

// POST a new earring
exports.addEarring = async (req, res) => {
  try {
    const newEarring = new Earring(req.body);
    await newEarring.save();
    res.status(201).json({ message: 'Earring added successfully', earring: newEarring });
  } catch (error) {
    res.status(400).json({ message: 'Error adding earring', error });
  }
};
