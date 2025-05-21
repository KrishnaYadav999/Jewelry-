const express = require("express");
const { registerUser, getUsers } = require("../controllers/User");

const router = express.Router();

// Register route (POST)
router.post("/register", registerUser);

// Get users route (GET)
router.get("/", getUsers);

module.exports = router;
