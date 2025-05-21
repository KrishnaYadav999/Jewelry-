const express = require('express');
const { body, validationResult } = require('express-validator');
const { loginUser, verifyOtp, getUserData } = require('../controllers/User'); // Assuming getUserData is the function to get user data

const router = express.Router();

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
  ],
  loginUser
);

// Verify OTP route
router.post(
  '/verify-otp',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('otp').notEmpty().withMessage('OTP cannot be empty'),
  ],
  verifyOtp
);

// Get user data route (Assuming user is identified by email or a JWT token)
router.get('/user', async (req, res) => {
  try {
    // Ensure the request includes a valid token in headers for authentication
    const token = req.headers['authorization']?.split(' ')[1]; // Assumes 'Authorization: Bearer token'
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    // Assuming you have a function to verify the token and get user info
    const user = await getUserData(token);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data in the response
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
