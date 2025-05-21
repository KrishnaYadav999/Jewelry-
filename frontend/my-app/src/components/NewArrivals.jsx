import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material'; // Import Material-UI Button

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get('http://localhost:5000/api/mangalsutras');

        console.log(response.data); // Debug the response

        if (Array.isArray(response.data.mangalsutras)) {
          setProducts(response.data.mangalsutras.slice(0, 8)); // Show only 8 products
        } else {
          throw new Error('API response does not contain mangalsutras array');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Mangalsutra</h1>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => {
          const safeRating = Math.max(0, Math.min(5, Math.floor(product.rating || 0)));

          return (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              state={product}
              className="flex flex-col bg-white border rounded-lg shadow-md overflow-hidden transition-transform duration-300"
            >
              {/* Product Image */}
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.images && product.images[0]}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>

                {/* Star Rating */}
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-sm">
                    {'★'.repeat(safeRating)}
                    {'☆'.repeat(5 - safeRating)}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price Info */}
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-red-500 text-lg font-bold">
                    Rs. {product.price}.00
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    Rs. {product.originalPrice}.00
                  </span>
                </div>

                {/* Discount Badge */}
                <span className="mt-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded self-start">
                  SAVE {product.discount}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Button without additional functionality */}
     <div className="flex justify-center mt-6">
  <Button variant="outlined" component={Link} to="/pages/mangalsutra">
    More
  </Button>
</div>
    </div>
  );
};

export default NewArrivals;
