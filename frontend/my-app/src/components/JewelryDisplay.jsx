import React, { useState, useEffect } from "react";

const JewelryDisplay = () => {
  const items = [
    { id: 1, src: "https://zerakijewels.com/cdn/shop/files/12_2e2525da-e36f-4563-a744-0622ae42431f.png?v=1713448000&width=700", label: "MANGALSUTRA" },
    { id: 2, src: "https://zerakijewels.com/cdn/shop/files/Untitled_design_-_2024-07-20T145341.575.png?v=1721467770&width=300", label: "BRACELETS" },
    { id: 3, src: "https://zerakijewels.com/cdn/shop/files/Untitled_design_-_2024-07-20T145350.917.png?v=1721468121&width=300", label: "NECKLACE SET" },
    { id: 4, src: "https://zerakijewels.com/cdn/shop/files/New7.jpg?v=1724746749&width=600", label: "PENDANT SET" },
    { id: 5, src: "https://zerakijewels.com/cdn/shop/files/Untitled_design_-_2024-07-20T145408.948.png?v=1721467837&width=300", label: "RINGS" },
    { id: 6, src: "https://zerakijewels.com/cdn/shop/files/Untitled_design_-_2024-07-20T145400.116.png?v=1721467868&width=300", label: "EARRINGS" },
    { id: 7, src: "https://zerakijewels.com/cdn/shop/files/MKR06918.jpg?v=1738648182&width=600", label: "BANGLES" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5); // 5 cards for desktop by default

  useEffect(() => {
    // Set the number of items to show per slide based on screen width
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile
      } else if (width < 1024) {
        setItemsPerView(3); // Tablet
      } else {
        setItemsPerView(5); // Desktop
      }
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < items.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative max-w-full mx-auto py-10 px-4">
      {/* Header */}
      <h2 className="text-center text-2xl font-bold mb-6">Choose from our Category</h2>
      
      {/* Slider container */}
      <div className="overflow-hidden">
        {/* Slide track */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${(currentIndex / itemsPerView) * 100}%)` }} // Adjust for number of visible items
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full sm:w-1/5 flex-shrink-0 p-2 group overflow-hidden relative"
              style={{ flex: `0 0 ${100 / itemsPerView}%` }} // Dynamic width based on items per view
            >
              {/* Jewelry image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Label */}
              <div className="text-center mt-4">
                <span className="text-lg font-semibold">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow (hidden if at the start) */}
      {currentIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 z-10"
          onClick={prevSlide}
        >
          &#8249;
        </button>
      )}

      {/* Right Arrow (hidden if at the end) */}
      {currentIndex < items.length - itemsPerView && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-3 z-10"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      )}
    </div>
  );
};

export default JewelryDisplay;
