// routes/earringRoutes.js
const express = require('express');
const { getAllEarrings, addEarring } = require('../controllers/earringController');
const router = express.Router();

// Route to get all earrings
router.get('/', getAllEarrings);

// Route to add a new earring
router.post('/', addEarring);

module.exports = router;
