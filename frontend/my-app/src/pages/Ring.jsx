import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Offer from '../components/Offer';
import axios from 'axios';
import Footer from '../components/Footer';

const RingPage = () => {
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

  // Fetch products from the API with pagination and sorting
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rings', {
        params: {
          sort: sortOption,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setProducts(response.data.rings);
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
        const nextIndex = (prevIndex + 1) % products.length;
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

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

  // Function to truncate description to 15 words
  const truncateDescription = (description) => {
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
      {products.length > 0 && (
        <div className="flex justify-center items-center p-4">
          <img
            src={products[0].images[currentImageIndex]}
            alt="Promotional Ad"
            className="w-full h-auto max-w-[1400px] rounded-lg shadow-lg transition-opacity duration-500 ease-in-out mt-16"
          />
        </div>
      )}
      <div className={`grid ${getGridClass()}`}>
        {currentItems.map((product) => (
          <div
            key={product._id}
            className={`${getCardSizeClass()} bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer`}
            onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
          >
            <div className="relative">
              <img
                src={product.images[0] || 'fallback-image-url'}
                alt={product.name || 'Ring Image'}
                className="w-full h-60 object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                SAVE {product.discount}%
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500 text-sm">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </span>
                <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCartClick(product); }}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
              {/* Add Description Here */}
              {product.description && (
                <div className="mt-4 text-sm text-gray-600">
                  <h4 className="font-semibold">Description:</h4>
                  <p>{truncateDescription(product.description)}</p>
                </div>
              )}
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
                  className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
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

export default RingPage;
