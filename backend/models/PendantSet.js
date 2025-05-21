const mongoose = require('mongoose');

const pendantSetSchema = new mongoose.Schema(
  {
    images: { 
      type: [String], // Array of image URLs representing the product's images
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    discount: { 
      type: Number, 
      required: true, 
      min: 0, 
      max: 100 
    },
    rating: { 
      type: Number, 
      default: 0, 
      min: 0, 
      max: 5 
    },
    reviews: { 
      type: Number, 
      default: 0, 
      min: 0 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    originalPrice: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    description: { 
      type: String, 
      required: true 
    }, // Description of the Pendant Set, e.g., "Elegant pendant set with intricate designs, perfect for special occasions."
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

module.exports = mongoose.model('PendantSet', pendantSetSchema);
