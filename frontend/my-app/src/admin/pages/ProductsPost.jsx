import React, { useState } from "react";

const ProductsPost = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [imagesInput, setImagesInput] = useState(""); // comma-separated string
  const [category, setCategory] = useState("Mangalsutras");
  const [originalPrice, setOriginalPrice] = useState("");
  const [reviews, setReviews] = useState("");
  const [description, setDescription] = useState(""); // Added description field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const categoryAPIs = {
    Mangalsutras: "http://localhost:5000/api/mangalsutras",
    Bangles: "http://localhost:5000/api/bangles",
    Bracelets: "http://localhost:5000/api/bracelets",
    Earrings: "http://localhost:5000/api/earrings",
    PendantSets: "http://localhost:5000/api/pendantSets",
    Rings: "http://localhost:5000/api/rings",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!name || !price || !originalPrice || !reviews || !category || !imagesInput || !description) {
      setError("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    const newProduct = {
      name,
      price,
      discount,
      rating,
      images: imagesInput.split(',').map(url => url.trim()), // convert to array
      category,
      originalPrice,
      reviews,
      description,
    };

    try {
      const response = await fetch(categoryAPIs[category], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to add product");
      }

      alert("Product added successfully!");

      // Clear fields
      setName("");
      setPrice("");
      setDiscount("");
      setRating("");
      setImagesInput("");
      setOriginalPrice("");
      setReviews("");
      setCategory("Mangalsutras");
      setDescription("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-4 min-h-screen`}>
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
            required
          />
        </div>

        {/* Original Price */}
        <div className="mb-4">
          <label className="block mb-2">Original Price</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
            required
          />
        </div>

        {/* Reviews */}
        <div className="mb-4">
          <label className="block mb-2">Reviews</label>
          <input
            type="number"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
            required
          />
        </div>

        {/* Discount */}
        <div className="mb-4">
          <label className="block mb-2">Discount</label>
          <input
            type="text"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
            required
          />
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block mb-2">Image URLs (comma-separated)</label>
          <input
            type="text"
            value={imagesInput}
            onChange={(e) => setImagesInput(e.target.value)}
            placeholder="Enter image URLs separated by commas"
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
            required
          />
          {imagesInput && imagesInput.split(",").map((url, i) => (
            <img
              key={i}
              src={url.trim()}
              alt={`Preview ${i + 1}`}
              className="w-full h-32 object-cover mt-2"
            />
          ))}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`border p-2 rounded w-full ${darkMode ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}
            required
          >
            {Object.keys(categoryAPIs).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Product"}
          </button>
        </div>
      </form>

      {/* Toggle Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default ProductsPost;
