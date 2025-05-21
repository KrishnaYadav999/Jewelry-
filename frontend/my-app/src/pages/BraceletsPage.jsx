import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Offer from '../components/Offer';
import axios from 'axios';
import Footer from '../components/Footer';

const BraceletsPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [gridColumns, setGridColumns] = useState(4);
  const [sortOption, setSortOption] = useState('Featured');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const promotionalAds = [
    "https://www.giva.co/cdn/shop/files/5_Bracelets_collection_phone.jpg?v=1744782594&width=550",
    "https://example.com/ad2.jpg",
    "https://example.com/ad3.jpg",
  ];

  // Fetch products from the API with pagination and sorting
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://jewelry-backend-gq4y.onrender.com/api/bracelets', {
        params: {
          sort: sortOption,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setProducts(response.data.bracelets);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOption]); // Fetch products on page or sort change

  // Image change interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % promotionalAds.length;
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [promotionalAds.length]);

  const handleCartClick = (product) => {
    const updatedCart = [...cart, { ...product, image: product.images[0], quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const getGridClass = () => {
    switch (gridColumns) {
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4';
      case 6:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
    }
  };

  const getCardSizeClass = () => {
    return gridColumns === 6 ? 'max-w-xs' : 'max-w-sm';
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const truncateDescription = (description) => {
    if (!description) return ''; // Return an empty string if description is undefined or null
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return description;
  };
  
  return (
    <div className="mt-14">
      <Offer />
      <Navbar />
      <div className="flex justify-center items-center p-4">
        <img
          src={promotionalAds[currentImageIndex]}
          alt="Promotional Ad"
          className="w-full h-auto max-w-[1400px] rounded-lg shadow-lg transition-opacity duration-500 ease-in-out mt-16"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {currentItems.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-md overflow-hidden transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
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
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {truncateDescription(product.description)}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-sm">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviews})
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-red-500 text-lg font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <span className="mt-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded self-start">
                SAVE {product.discount}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCartClick(product);
                }}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default BraceletsPage;
