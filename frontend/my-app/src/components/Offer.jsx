import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Offer = () => {
  const offerRef = useRef([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useLayoutEffect(() => {
    if (offerRef.current[visibleIndex]) {
      gsap.fromTo(
        offerRef.current[visibleIndex],
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          onComplete: () => {
            setTimeout(() => {
              setVisibleIndex((prev) => (prev + 1) % offerRef.current.length);
            }, 2000);
          },
        }
      );

      offerRef.current.forEach((el, index) => {
        if (index !== visibleIndex) {
          gsap.to(el, { opacity: 0, y: -20, duration: 0.5 });
        }
      });
    }
  }, [visibleIndex]);

  return (
    <div className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-indigo-600 text-sm font-medium text-white z-50">
      {['✨ Welcome to AMK ',
        '✨ Buy 1 Get 1 Free on All Mangalsutras!💫',
        '✨ Buy 3 Get 15% OFF.'
      ].map((offer, index) => (
        <p
          key={index}
          ref={(el) => (offerRef.current[index] = el)}
          className="absolute flex items-center justify-center"
          style={{
            opacity: index === visibleIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            height: '2.5rem',
            lineHeight: '2.5rem',
            color: 'gold',
          }}
        >
          {offer}
        </p>
      ))}
    </div>
  );
};

export default Offer;
