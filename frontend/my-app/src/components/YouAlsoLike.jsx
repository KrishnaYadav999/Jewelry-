import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const YouAlsoLike = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Function to limit description to 4 words
  const truncateDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return description;
  };

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const banglesResponse = await axios.get("http://localhost:5000/api/bangles");
        const mangalsutrasResponse = await axios.get("http://localhost:5000/api/mangalsutras");
        const braceletsResponse = await axios.get("http://localhost:5000/api/bracelets");
        const earringsResponse = await axios.get("http://localhost:5000/api/earrings");
        const ringsResponse = await axios.get("http://localhost:5000/api/rings");

        const banglesData = banglesResponse.data.bangles || [];
        const mangalsutrasData = mangalsutrasResponse.data.mangalsutras || [];
        const braceletsData = braceletsResponse.data.bracelets || [];
        const earringsData = earringsResponse.data.earrings || [];
        const ringsData = ringsResponse.data.rings || [];

        const allProducts = [
          ...banglesData,
          ...mangalsutrasData,
          ...braceletsData,
          ...earringsData,
          ...ringsData
        ].slice(0, 12);

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const moveLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 4 : prevIndex - 4
    );
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 4 ? 0 : prevIndex + 4
    );
  };

  // Navigate to product detail page with product _id
  const goToProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">You Also Like</h2>
      <div className="relative">
        <button
          onClick={moveLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 hover:bg-gray-600"
        >
          &lt;
        </button>

        <div className="flex space-x-4 overflow-x-hidden overflow-y-hidden">
          {products.slice(currentIndex, currentIndex + 4).map((product) => (
            <div
              key={product._id}
              onClick={() => goToProductDetail(product._id)} // Navigate on card click
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-96 min-w-[200px] hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-52 h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">
                ${product.price}{" "}
                <span className="line-through text-gray-400">{product.originalPrice && `$${product.originalPrice}`}</span>
              </p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500">{"★".repeat(product.rating || 0)}</span>
                <span className="text-gray-500 ml-2">({product.reviews || 0} reviews)</span>
              </div>
              <p className="text-gray-600 mt-2 text-sm">{truncateDescription(product.description)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent div click
                  goToProductDetail(product._id);
                }}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={moveRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 hover:bg-gray-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default YouAlsoLike;
