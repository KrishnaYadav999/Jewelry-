import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Offer from "./Offer";
import CustomerReviews from "./CustomerReviews";
import YouAlsoLike from "./YouAlsoLike";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // For accordion toggle

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product data
  const fetchProductData = async () => {
    const urls = [
      "https://jewelry-backend-gq4y.onrender.com/api/mangalsutras",
      "https://jewelry-backend-gq4y.onrender.com/api/bangles",
      "https://jewelry-backend-gq4y.onrender.com/api/bracelets",
      "https://jewelry-backend-gq4y.onrender.com/api/earrings",
      "https://jewelry-backend-gq4y.onrender.com/api/pendantSets",
      "https://jewelry-backend-gq4y.onrender.com/api/rings",
      "https://jewelry-backend-gq4y.onrender.com/api/necklacesets",
      "https://jewelry-backend-gq4y.onrender.com/api/earrings-combos"
    ];

    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));

      // Flatten all product arrays from different categories
      const allProducts = data.flatMap((category) => {
        const key = Object.keys(category)[0];
        return category[key] || [];
      });

      // Find product matching the id (compare string versions trimmed)
      const foundProduct = allProducts.find(
        (item) => String(item._id).trim() === String(id).trim()
      );

      setProduct(foundProduct || null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setError(error.message || "Failed to load product.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setCurrentImage(product.images[0]);
    } else {
      setCurrentImage(null);
    }
  }, [product]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active accordion section
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <div className="loader mb-4"></div>
        <p className="text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const { name, price, images = [], description } = product;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check for _id because your products use _id as unique identifier
    const exists = cart.some((item) => item._id === product._id);

    if (!exists) {
      const productWithDetails = { ...product, quantity: 1, image: currentImage || images[0] };
      cart.push(productWithDetails);
      localStorage.setItem("cart", JSON.stringify(cart));
      navigate("/cart");
    } else {
      alert("Product already in cart.");
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: product });
  };

  const accordionData = [
    { title: "Description & Fit", content: description || "No description available." },
    { title: "Materials", content: "Gold, Silver, Diamonds (sample materials)." },
    { title: "Care Guide", content: "Handle with care, avoid water and harsh chemicals." },
  ];

  return (
    <>
      <div className="mt-14">
        <Offer />
      </div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="lg:flex gap-8 mt-20">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
            <img
              src={currentImage || "/fallback-image.jpg"}
              alt={name}
              className="w-full lg:max-w-md rounded"
            />

            <div className="mt-4 flex gap-4 flex-wrap">
              {images.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="w-20 h-20 cursor-pointer border border-gray-300 rounded overflow-hidden hover:border-blue-500"
                >
                  <img
                    src={img || "/fallback-image.jpg"}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                    onClick={() => setCurrentImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600 mt-2">MRP inclusive of all taxes</p>
            <p className="text-2xl font-bold mt-2">₹{price}.00</p>

            <div className="mt-4">
              {accordionData.map((item, index) => (
                <div key={index} className="border-b border-gray-300">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center py-4 focus:outline-none"
                  >
                    <span className="text-lg font-medium">{item.title}</span>
                    <span
                      className={`transform transition-transform ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      &#9662;
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-max-height duration-300 ${
                      activeIndex === index ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-700 px-4 py-2">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full mt-4 bg-black text-white font-semibold py-3 rounded-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full mt-4 bg-blue-500 text-white font-semibold py-3 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <CustomerReviews />
      <YouAlsoLike />
      <Footer />
    </>
  );
};

export default ProductDetail;
