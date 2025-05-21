const EarringsCombo = require('../models/EarringsCombo');

// GET all earrings combos
exports.getAllEarringsCombos = async (req, res) => {
  try {
    const earringsCombos = await EarringsCombo.find();
    res.json({ earringsCombos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching earrings combos', error });
  }
};

// POST a new earrings combo
exports.addEarringsCombo = async (req, res) => {
  try {
    const newEarringsCombo = new EarringsCombo(req.body);
    await newEarringsCombo.save();
    res.status(201).json({ message: 'Earrings combo added successfully', earringsCombo: newEarringsCombo });
  } catch (error) {
    res.status(400).json({ message: 'Error adding earrings combo', error });
  }
};
