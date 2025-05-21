// routes/pendantSetRoutes.js
const express = require('express');
const { getAllPendantSets, addPendantSet } = require('../controllers/pendantSetController');
const router = express.Router();

// Route to get all pendant sets
router.get('/', getAllPendantSets);

// Route to add a new pendant set
router.post('/', addPendantSet);

module.exports = router;
