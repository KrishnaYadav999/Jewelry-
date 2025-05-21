// routes/braceletRoutes.js
const express = require('express');
const { getAllBracelets, addBracelet } = require('../controllers/braceletController');
const router = express.Router();

// GET all bracelets
router.get('/', getAllBracelets);

// POST a new bracelet
router.post('/', addBracelet); // Ensure POST route is here

module.exports = router;
