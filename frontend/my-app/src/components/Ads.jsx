import React, { useEffect, useState } from 'react';

const Ads = () => {
  const images = [
    "https://zerakijewels.com/cdn/shop/files/Buy_1_Get_1_Free_on_Mangalsutra_Collection.jpg?v=1716031624&width=1400",
    "https://zerakijewels.com/cdn/shop/files/New_arrivals_BANNER_ANKLETS.jpg?v=1723196559&width=1400",
    "https://zerakijewels.com/cdn/shop/files/009_3apr_46558d19-e219-4ebd-b056-23c3fd0fae62.png?v=1745050802&width=1600",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [progress, setProgress] = useState(0);
  const duration = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setFade(true);
        setProgress(0); // reset
      }, 500);
    }, duration);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    let start = performance.now();

    const animate = (time) => {
      const elapsed = time - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [currentImageIndex]);

  return (
    <div className="flex flex-col items-center justify-center mt-16 relative -z-50">
      <div className="relative w-full max-w-[1400px] mt-20 lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[currentImageIndex]}
          alt="Ad"
          className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Progress Circles */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {images.map((_, index) => {
            const isActive = index === currentImageIndex;
            return (
              <div key={index} className="relative w-6 h-6">
                <svg width="24" height="24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#ccc"
                    strokeWidth="2"
                    fill="none"
                  />
                  {isActive && (
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#4169e1"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 10}
                      strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 10}
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ads;
