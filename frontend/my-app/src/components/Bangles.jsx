import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed

const Bangles = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch bangles data from the API
        const response = await axios.get("http://localhost:5000/api/bangles");

        // Log response to debug structure
        console.log(response.data);

        // Access the 'bangles' property from the response if it exists
        if (Array.isArray(response.data.bangles)) {
          setProducts(response.data.bangles.slice(0, 8)); // Limit to 8 items
        } else {
          throw new Error("API response does not contain bangles array");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
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
      {/* Banner image */}
      <img
        src="https://zerakijewels.com/cdn/shop/files/Bangle_Banner_Done_2_d3dccae5-6779-4e82-93dd-f03c0a70c0ae.png?v=1729580635&width=2000"
        alt="Bangles Banner"
        className="w-full h-auto max-w-full object-cover mb-6"
      />

      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center mb-6">Bangles</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
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
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-sm">
                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviews})
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-red-500 text-lg font-bold">
                  Rs. {product.price}.00
                </span>
                <span className="text-gray-400 line-through text-sm">
                  Rs. {product.originalPrice}.00
                </span>
              </div>
              <span className="mt-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded self-start">
                SAVE {product.discount}%
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-6">
        <Button variant="outlined" component={Link} to="/pages/BanglesPage">
          More
        </Button>
      </div>
    </div>
  );
};

export default Bangles;
