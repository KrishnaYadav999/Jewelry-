import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import ReviewModal from "./ReviewModal"; // Import the modal component

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await fetch("https://jewelry-backend-gq4y.onrender.com/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`text-xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Generate rating breakdown
  const ratingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      breakdown[review.rating]++; // Update the rating breakdown
    });
    return breakdown;
  };

  const breakdown = ratingBreakdown();

  // Function to handle the review submission
  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        // If the submission is successful, fetch updated reviews
        const updatedReviews = await response.json();
        setReviews(updatedReviews);
        setIsModalOpen(false); // Close the modal
      } else {
        alert("Failed to submit the review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting the review");
    }
  };

  return (
    <div className="min-h-screen py-16 px-6 lg:px-20">
      {/* Average Rating & Total Reviews */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">{calculateAverageRating()}</h2>
        <div className="flex justify-center mb-2">
          {renderStars(Math.round(calculateAverageRating()))}
        </div>
        <p className="text-gray-600">{reviews.length} reviews</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-yellow-600 transition"
        >
          Write a review
        </button>
      </div>

      {/* Ratings Breakdown */}
      <div className="mb-8">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center mb-2">
            <span className="text-gray-800 mr-2">{star}</span>
            <FaStar className="text-yellow-500 mr-2" />
            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
              <div
                className="bg-yellow-500 h-full"
                style={{
                  width: `${(breakdown[star] / reviews.length) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-gray-600 ml-2">{breakdown[star]}</span>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div>
        {reviews.length > 0 ? (
          reviews.slice(0, displayedReviews).map((review, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="user avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{review.title}</p>
                  <p className="text-sm text-gray-500">Posted 2 days ago</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{review.description}</p>
              <div className="flex items-center">{renderStars(review.rating)}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>

      {/* Show More Button */}
      {reviews.length > displayedReviews && (
        <button
          onClick={() => setDisplayedReviews(displayedReviews + 8)}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Show More
        </button>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit} // Handle submit
      />
    </div>
  );
};

export default CustomerReviews;
