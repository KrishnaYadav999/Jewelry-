const express = require('express');
const { getAllEarringsCombos, addEarringsCombo } = require('../controllers/earringsComboController'); // Ensure this path is correct
const router = express.Router();

// Route to get all earrings combos
router.get('/', getAllEarringsCombos);

// Route to add a new earrings combo
router.post('/', addEarringsCombo); // This line expects addEarringsCombo to be defined and imported correctly

module.exports = router;
