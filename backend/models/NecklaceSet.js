// models/NecklaceSet.js

const mongoose = require('mongoose');

const NecklaceSetSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
    }, // Array of image URLs representing the product's images

    name: {
      type: String,
      required: true,
    }, // Name of the Necklace Set

    discount: {
      type: Number,
      required: true,
    }, // Discount percentage on the original price

    rating: {
      type: Number,
      required: true,
    }, // Customer rating (out of 5) for the product

    reviews: {
      type: Number,
      required: true,
    }, // Number of reviews the product has received

    price: {
      type: Number,
      required: true,
    }, // Price of the Necklace Set after discount

    originalPrice: {
      type: Number,
      required: true,
    }, // Original price of the Necklace Set before discount

    description: {
      type: String,
      required: true,
    }, // Description of the Necklace Set
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

const NecklaceSet = mongoose.model('NecklaceSet', NecklaceSetSchema);
module.exports = NecklaceSet;
