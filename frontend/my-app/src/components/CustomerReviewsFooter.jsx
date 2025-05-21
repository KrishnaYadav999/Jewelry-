import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState(6);
  const reviewsRef = useRef(null);

  // Fetch reviews from API (Updated to 'cf' API)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cf");
        const data = await response.json();
        setReviews(data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // GSAP animation
  useEffect(() => {
    if (reviews.length > 0) {
      gsap.from(reviewsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });
    }
  }, [reviews]);

  // Render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"} />
    ));
  };

  return (
    <section className="bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
          <p className="text-gray-500">See what our customers have to say</p>
        </div>

        {/* Reviews Container */}
        <div ref={reviewsRef} className="grid md:grid-cols-2 gap-6">
          {reviews.slice(0, displayedReviews).map((review, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-700">
                    {review?.name ? review.name.charAt(0) : "U"} {/* ✅ Fix applied */}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">
                    {review?.name || "Unknown User"} {/* ✅ Fix applied */}
                  </h4>
                  <div className="flex">{renderStars(review?.rating || 0)}</div>
                </div>
              </div>
              <p className="text-gray-600">{review?.description || "No description available."}</p>
            </div>
          ))}
        </div>

        {/* Write a Review Button */}
        <div className="text-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition">
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
