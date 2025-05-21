const mongoose = require('mongoose');

const ringSchema = new mongoose.Schema(
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
    }, // Description of the Ring, e.g., "This elegant ring is crafted with precision and offers timeless beauty."
    size: {
      type: String, // The size of the ring (e.g., "6", "7", "8", etc.)
      required: true
    }
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

module.exports = mongoose.model('Ring', ringSchema);
