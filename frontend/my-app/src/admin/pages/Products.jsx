import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const categoryAPIs = {
    Mangalsutras: "https://jewelry-backend-gq4y.onrender.com/api/mangalsutras",
    Bangles: "https://jewelry-backend-gq4y.onrender.com/api/bangles",
    Bracelets: "https://jewelry-backend-gq4y.onrender.com/api/bracelets",
    Earrings: "https://jewelry-backend-gq4y.onrender.com/api/earrings",
    PendantSets: "https://jewelry-backend-gq4y.onrender.com/api/pendantSets",
    Rings: "https://jewelry-backend-gq4y.onrender.com/api/rings",
  };

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const promises = Object.entries(categoryAPIs).map(async ([category, url]) => {
        const response = await fetch(url);
        const data = await response.json();
        return (data[category.toLowerCase()] || []).map((item) => ({
          ...item,
          category,
        }));
      });

      const results = await Promise.all(promises);
      setProducts(results.flat());
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (filterCategory !== "All") {
      result = result.filter((product) => product.category === filterCategory);
    }
    return result.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, filterCategory, searchTerm]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <select
              value={filterCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="All">All</option>
              {Object.keys(categoryAPIs).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              className="ml-2 border p-2 rounded"
            />
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-6 py-3">Name</th>
                <th className="border border-gray-300 px-6 py-3">Price</th>
                <th className="border border-gray-300 px-6 py-3">Discount</th>
                <th className="border border-gray-300 px-6 py-3">Rating</th>
                <th className="border border-gray-300 px-6 py-3">Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-blue-500 cursor-pointer"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <td className="border border-gray-300 px-6 py-4">{product.name}</td>
                    <td className="border border-gray-300 px-6 py-4">₹{product.price}</td>
                    <td className="border border-gray-300 px-6 py-4">{product.discount || "N/A"}</td>
                    <td className="border border-gray-300 px-6 py-4">{product.rating || "N/A"}</td>
                    <td className="border border-gray-300 px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
