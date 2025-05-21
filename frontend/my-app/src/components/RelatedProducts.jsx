import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ currentProductCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch related products based on category
  useEffect(() => {
    if (!currentProductCategory) {
      setError("No category provided");
      setLoading(false);
      return;
    }

    const fetchRelatedProducts = async () => {
      try {
        console.log(`Fetching related products for category: ${currentProductCategory}`); // Log category
        const response = await fetch(`http://localhost:5000/api/${currentProductCategory}`);
        const data = await response.json();
        
        if (!data || !data[currentProductCategory]) {
          throw new Error("No products found for this category.");
        }

        setRelatedProducts(data[currentProductCategory] || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductCategory]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="loader"></div>
        <p>Loading related products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20">{error}</div>;
  }

  if (relatedProducts.length === 0) {
    return <div className="text-center py-20">No related products found</div>;
  }

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold text-center">You may also like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {relatedProducts.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-md">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.images[0] || "/fallback-image.jpg"}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-medium">{product.name}</h4>
                <p className="text-gray-500 mt-2">{product.description?.slice(0, 50)}...</p>
                <p className="text-xl font-bold mt-2">₹{product.price}.00</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
