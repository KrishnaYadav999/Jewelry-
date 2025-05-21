const Review = require("../models/reviewModel");

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
  const { title, image, description, rating } = req.body;

  // Validate input
  if (!title || !description || !rating) {
    return res.status(400).json({ error: "Title, description, and rating are required." });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  try {
    const newReview = await Review.create({
      title,
      image,
      description,
      rating,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Public
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
};
