const express = require('express');
const { getMangalsutras, createMangalsutra } = require('../controllers/mangalsutraController');
const router = express.Router();

// GET all mangalsutras
router.get('/', getMangalsutras);

// POST a new mangalsutra
router.post('/', createMangalsutra);

module.exports = router;
