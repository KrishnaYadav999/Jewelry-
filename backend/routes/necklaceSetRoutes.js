const express = require('express');
const router = express.Router();
const necklaceSetController = require('../controllers/necklaceSetController');

// GET all necklace sets
router.get('/', necklaceSetController.getAllNecklaceSets);

// POST a new necklace set
router.post('/', necklaceSetController.addNecklaceSet);

module.exports = router;
