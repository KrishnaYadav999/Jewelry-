const mongoose = require('mongoose');

const earringsComboSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true
    }, // Array of image URLs representing the product's images

    name: {
      type: String,
      required: true
    }, // Name of the earrings combo

    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }, // Discount percentage

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }, // Customer rating (out of 5)

    reviews: {
      type: Number,
      default: 0,
      min: 0
    }, // Number of reviews

    price: {
      type: Number,
      required: true,
      min: 0
    }, // Price after discount

    originalPrice: {
      type: Number,
      required: true,
      min: 0
    }, // Original price before discount

    description: {
      type: String,
      required: true
    }, // Description of the earrings combo
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model('EarringsCombo', earringsComboSchema);
