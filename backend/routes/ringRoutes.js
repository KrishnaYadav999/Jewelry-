// routes/ringRoutes.js
const express = require('express');
const { getAllRings, addRing } = require('../controllers/ringController');
const router = express.Router();

// Route to get all rings
router.get('/', getAllRings);

// Route to add a new ring
router.post('/', addRing);

module.exports = router;
