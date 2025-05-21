const express = require('express');
const { verifyOtp } = require('../controllers/User');

const router = express.Router();

// OTP verification route
router.post('/verify-otp', verifyOtp);

module.exports = router;
