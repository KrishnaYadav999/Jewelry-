const express = require('express');
const { chatWithGemini } = require('../controllers/chatController');

const router = express.Router();

// Route for handling chatbot requests
router.post('/chat', chatWithGemini);

module.exports = router;
