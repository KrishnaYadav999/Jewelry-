const mongoose = require('mongoose');

const MangalsutraSchema = new mongoose.Schema(
    { 
        images: { 
            type: [String], 
            required: true 
        }, // Array of image URLs representing the product's images

        name: { 
            type: String, 
            required: true 
        }, // Name of the Mangalsutra

        discount: { 
            type: Number, 
            required: true 
        }, // Discount percentage on the original price

        rating: { 
            type: Number, 
            required: true 
        }, // Customer rating (out of 5) for the product

        reviews: { 
            type: Number, 
            required: true 
        }, // Number of reviews the product has received

        price: { 
            type: Number, 
            required: true 
        }, // Price of the Mangalsutra after discount

        originalPrice: { 
            type: Number, 
            required: true 
        }, // Original price of the Mangalsutra before discount
        
        description: { 
            type: String, 
            required: true 
        }, // Description of the Mangalsutra, e.g., "This beautiful gold mangalsutra is designed with intricate details and is perfect for any occasion."
    },
    { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

const Mangalsutra = mongoose.model('Mangalsutra', MangalsutraSchema);
module.exports = Mangalsutra;
