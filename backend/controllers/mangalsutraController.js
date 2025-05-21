const Mangalsutra = require('../models/Mangalsutra');

// Get all Mangalsutras
exports.getMangalsutras = async (req, res) => {
    try {
        const mangalsutras = await Mangalsutra.find();
        res.json({ mangalsutras });
    } catch (error) {
        console.error('Error fetching mangalsutras:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new Mangalsutra
exports.createMangalsutra = async (req, res) => {
    const newMangalsutra = new Mangalsutra(req.body);
    try {
        const savedMangalsutra = await newMangalsutra.save();
        res.status(201).json(savedMangalsutra);
    } catch (error) {
        console.error('Error creating mangalsutra:', error);
        res.status(400).json({ message: 'Error creating mangalsutra', error });
    }
};
