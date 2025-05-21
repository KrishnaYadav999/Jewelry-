import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Offer from '../components/Offer';
import axios from 'axios';
import Footer from '../components/Footer';

const EarringsPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true); // New state for image fade effect
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
    "https://plugins-media.makeupar.com/smb/blog/post/2023-08-23/b7d028b0-7cd9-4b2c-a04b-88082f388889.jpg",
    "https://www.misshighness.com/cdn/shop/files/earrings-mobile-banner.jpg?v=1700815814&width=3840",
    "https://cdn.shopify.com/s/files/1/2124/6477/files/3_290a9005-91fa-449a-8a7d-8c0b735c3664_2048x2048.jpg?v=1666224911",
  ];

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://jewelry-backend-gq4y.onrender.com/api/earrings', {
        params: {
          sort: sortOption,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setProducts(response.data.earrings);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOption]);

  // Auto image change with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % promotionalAds.length);
        setFade(true); // Fade-in new image
      }, 500);
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
    if (!description) return '';
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
          className={`w-full h-[70vh] max-w-[1400px] rounded-lg shadow-lg mt-16 transition-opacity duration-700 ease-in-out ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className={`grid ${getGridClass()} p-4`}>
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
                <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
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

export default EarringsPage;
