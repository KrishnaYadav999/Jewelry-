import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import Offer from './Offer'; // Ensure Offer component is imported
import Navbar from './Navbar'; // Ensure Navbar component is imported
import Footer from './Footer'; // Ensure Footer component is imported

const Crf = () => {
  // Sample reviews data
  const reviewsData = Array.from({ length: 120 }, (_, index) => ({
    id: index + 1,
    name: `Customer ${index + 1}`,
    date: new Date(2025, index % 12, index + 1).toLocaleDateString(),
    rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1-5
    review: `This is review number ${index + 1}. It is a random review to simulate the reviews list in the system.`,
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 10;

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Get the current reviews based on the page
  const currentReviews = reviewsData.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  // Function to generate the star rating
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-14">
      {/* Ensure these components are present and properly defined */}
      <Offer />
      <Navbar />
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6 mt-20">Customer Reviews</h2>

        {/* Display reviews */}
        <div className="space-y-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div>{renderStars(review.rating)}</div>
              </div>
              <p>{review.review}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(reviewsData.length / reviewsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center mt-6 space-x-3"
          pageClassName="cursor-pointer px-4 py-2 border rounded-lg hover:bg-indigo-600 hover:text-white"
          activeClassName="bg-indigo-600 text-white"
          previousClassName="cursor-pointer px-4 py-2 border rounded-lg hover:bg-indigo-600 hover:text-white"
          nextClassName="cursor-pointer px-4 py-2 border rounded-lg hover:bg-indigo-600 hover:text-white"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Crf;
