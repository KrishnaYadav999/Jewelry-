import React, { useState } from "react";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!title || !description || !rating) {
      alert("Please fill all fields!");
      return;
    }
    onSubmit({ title, image, description, rating });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Write a Review</h2>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-gray-700">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded p-2"
          >
            <option value="0">Select Rating</option>
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter a title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Write your review"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter image URL (optional)"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
