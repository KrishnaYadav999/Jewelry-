// controllers/pendantSetController.js
const PendantSet = require('../models/PendantSet');

// GET all pendant sets
exports.getAllPendantSets = async (req, res) => {
  try {
    const pendantSets = await PendantSet.find();
    res.json({ pendantSets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pendant sets', error });
  }
};

// POST a new pendant set
exports.addPendantSet = async (req, res) => {
  try {
    const newPendantSet = new PendantSet(req.body);
    await newPendantSet.save();
    res.status(201).json({ message: 'Pendant Set added successfully', pendantSet: newPendantSet });
  } catch (error) {
    res.status(400).json({ message: 'Error adding pendant set', error });
  }
};
