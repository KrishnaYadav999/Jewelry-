const Product = require('../models/Product');

// Sample function for fetching products (could be expanded for product operations)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

module.exports = { getProducts };
