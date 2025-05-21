import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VideoCard = ({ videoSrc, videoAlt, index }) => {
  useEffect(() => {
    // GSAP animation for scroll-triggered effects
    gsap.fromTo(
      `.card-${index}`,
      { opacity: 0, y: 50 }, // Initial state
      {
        opacity: 1,
        y: 0,
        duration: 0.8, // Smooth animation duration
        scrollTrigger: {
          trigger: `.card-${index}`,
          start: "top 80%", // When the top of the card reaches 80% of the viewport
          end: "bottom 20%", // When the bottom reaches 20% of the viewport
          toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
        },
      }
    );
  }, [index]);

  return (
    <div
      className={`card-${index} bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 -z-20`}
    >
      <video
        src={videoSrc}
        alt={videoAlt}
        autoPlay
        loop
        muted
        className="sm:w-full sm:h-full object-cover lg:w-full lg:h-64"
      />
    </div>
  );
};

export default VideoCard;
