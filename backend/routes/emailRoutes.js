const express = require('express');
const { sendOtpEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/send-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        await sendOtpEmail(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

module.exports = router;
