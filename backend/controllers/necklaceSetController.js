// controllers/necklaceSetController.js
const NecklaceSet = require('../models/NecklaceSet');

// GET all necklace sets
exports.getAllNecklaceSets = async (req, res) => {
  try {
    const necklaceSets = await NecklaceSet.find();
    res.json({ necklaceSets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching necklace sets', error });
  }
};

// POST a new necklace set
exports.addNecklaceSet = async (req, res) => {
  try {
    const newNecklaceSet = new NecklaceSet(req.body);
    await newNecklaceSet.save();
    res.status(201).json({ message: 'Necklace set added successfully', necklaceSet: newNecklaceSet });
  } catch (error) {
    res.status(400).json({ message: 'Error adding necklace set', error });
  }
};
