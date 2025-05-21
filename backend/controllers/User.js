const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOtpEmail } = require('../utils/emailSender');
const crypto = require('crypto'); // For OTP generation

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

// Login User with OTP functionality
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate a 4-digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();

    // Hash the OTP before storing it in the database
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save OTP hash and expiration time in the database
    user.otp = hashedOtp;
    user.otpExpiration = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    await user.save();

    // Send OTP via email
    await sendOtpEmail(email, otp);

    console.log(`OTP sent to ${email}: ${otp}`);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ msg: "Login successful, OTP sent to email", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "Server error during login" });
  }
};

// Verify OTP functionality
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ msg: "Email and OTP are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (!user.otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ msg: "OTP expired or not requested." });
    }

    // Compare the hashed OTP stored in the database with the entered OTP
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ msg: "Invalid OTP." });
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).json({ msg: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ msg: "Server error during OTP verification" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Return users as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Server error fetching users" });
  }
};

module.exports = { loginUser, registerUser, verifyOtp, getUsers };
