import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Offer from '../components/Offer';
import axios from 'axios';
import Footer from '../components/Footer';

const PendantSetPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [gridColumns] = useState(4);
  const [sortOption, setSortOption] = useState('Featured');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const promotionalAds = [
    "https://example.com/pendant-ad1.jpg",
    "https://example.com/pendant-ad2.jpg",
    "https://example.com/pendant-ad3.jpg",
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://jewelry-backend-gq4y.onrender.com/api/pendantsets', {
        params: {
          sort: sortOption,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setProducts(response.data.pendantSets);
    } catch (error) {
      console.error('Error fetching pendant sets:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOption]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % promotionalAds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [promotionalAds.length]);

  const handleCartClick = (product) => {
    const updatedCart = [...cart, { ...product, image: product.images[0], quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const truncateDescription = (description = '') => {
    const words = description.split(' ');
    return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : description;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
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
            <div className="aspect-w-1 aspect-h-1 w-full">
              <img
                src={product.images && product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
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

export default PendantSetPage;
