const express = require("express");
const router = express.Router();
const {
  getReviews,
  createReview,
  deleteReview,
} = require("../controllers/reviewsController");

// Route: Get all reviews
router.get("/", getReviews);

// Route: Add a new review
router.post("/", createReview);

// Route: Delete a review
router.delete("/:id", deleteReview);

module.exports = router;
