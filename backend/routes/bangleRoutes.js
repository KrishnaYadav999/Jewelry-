// routes/bangleRoutes.js
const express = require('express');
const { getAllBangles, addBangle } = require('../controllers/bangleController'); // Ensure this path is correct
const router = express.Router();

// Route to get all bangles
router.get('/', getAllBangles);

// Route to add a new bangle
router.post('/', addBangle); // This line expects addBangle to be defined and imported correctly

module.exports = router;
