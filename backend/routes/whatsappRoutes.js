const express = require("express");
const { sendMessage } = require("../controllers/whatsappController");

const router = express.Router();

// POST endpoint to send WhatsApp message
router.post("/send-whatsapp", sendMessage);

module.exports = router;
