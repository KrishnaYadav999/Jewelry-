// controllers/bangleController.js
const Bangle = require('../models/Bangle');

// GET all bangles
exports.getAllBangles = async (req, res) => {
  try {
    const bangles = await Bangle.find();
    res.json({ bangles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bangles', error });
  }
};

// POST a new bangle
exports.addBangle = async (req, res) => {
  try {
    const newBangle = new Bangle(req.body);
    await newBangle.save();
    res.status(201).json({ message: 'Bangle added successfully', bangle: newBangle });
  } catch (error) {
    res.status(400).json({ message: 'Error adding bangle', error });
  }
};
