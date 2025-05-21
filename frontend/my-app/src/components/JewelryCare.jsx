import React from "react";
import {
  FaGem,
  FaTools,
  FaRegHandPaper,
  FaSearch,
  FaRegLightbulb,
} from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Offer from "./Offer";

const JewelryCare = () => {
  return (
    <>
      <div>
      <div className="mt-14">
        <Offer />
      </div>
        <Navbar />
      </div>
      <div className=" min-h-screen">
        <div className="max-w-screen-xl mx-auto px-8 py-24">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-center  mb-12 drop-shadow-2xl tracking-tight">
            Jewelry Care: Preserve Your Timeless Investment
          </h1>

          {/* Intro Section */}
          <p className="text-lg sm:text-xl text-center mb-16 max-w-4xl mx-auto opacity-80">
            Follow these expert tips to protect your cherished jewelry, ensuring
            it remains as stunning as the day you acquired it.
          </p>

          {/* Grid of Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {/* Card 1: Keep Jewelry Clean */}
            <div className="bg-white text-gray-800 rounded-3xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out group">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519032292278-d23b3fd313f3"
                  alt="Jewelry Cleaning"
                  className="w-full h-60 object-cover rounded-t-3xl opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-all duration-300 rounded-t-3xl"></div>
              </div>
              <div className="p-8 text-center relative z-10">
                <FaGem className="text-4xl text-indigo-600 mb-4 transform group-hover:scale-110 transition-all duration-300" />
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 leading-tight">
                  1. Keep Jewelry Clean
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 opacity-90">
                  Use a soft cloth to clean your jewelry regularly. For deep
                  cleaning, use a specialized jewelry cleaner suited for the
                  metal and stones.
                </p>
              </div>
            </div>

            {/* Card 2: Store Jewelry Properly */}
            <div className="bg-white text-gray-800 rounded-3xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out group">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1532828850727-cd29ee07c2d6"
                  alt="Jewelry Storage"
                  className="w-full h-60 object-cover rounded-t-3xl opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-all duration-300 rounded-t-3xl"></div>
              </div>
              <div className="p-8 text-center relative z-10">
                <FaRegHandPaper className="text-4xl text-indigo-600 mb-4 transform group-hover:scale-110 transition-all duration-300" />
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 leading-tight">
                  2. Store Jewelry Properly
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 opacity-90">
                  Store your jewelry in a cool, dry place away from direct
                  sunlight. Use individual pouches or boxes to prevent scratches
                  and tangling.
                </p>
              </div>
            </div>

            {/* Card 3: Remove Jewelry During Activities */}
            <div className="bg-white text-gray-800 rounded-3xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out group">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1572300973474-d4fdf3d86b82"
                  alt="Remove Jewelry"
                  className="w-full h-60 object-cover rounded-t-3xl opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-all duration-300 rounded-t-3xl"></div>
              </div>
              <div className="p-8 text-center relative z-10">
                <FaTools className="text-4xl text-indigo-600 mb-4 transform group-hover:scale-110 transition-all duration-300" />
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 leading-tight">
                  3. Remove Jewelry During Activities
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 opacity-90">
                  Remove your jewelry during activities like swimming or
                  exercising to prevent damage from chemicals or physical
                  stress.
                </p>
              </div>
            </div>

            {/* Card 4: Regular Inspections */}
            <div className="bg-white text-gray-800 rounded-3xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out group">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1590677368702-f00b573b42fd"
                  alt="Jewelry Inspections"
                  className="w-full h-60 object-cover rounded-t-3xl opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-all duration-300 rounded-t-3xl"></div>
              </div>
              <div className="p-8 text-center relative z-10">
                <FaSearch className="text-4xl text-indigo-600 mb-4 transform group-hover:scale-110 transition-all duration-300" />
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 leading-tight">
                  4. Regular Inspections
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 opacity-90">
                  Inspect jewelry regularly for signs of wear. If you find loose
                  stones or broken clasps, have them repaired professionally.
                </p>
              </div>
            </div>

            {/* Card 5: Polishing */}
            <div className="bg-white text-gray-800 rounded-3xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out group">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1606895080240-b1e7605be46b"
                  alt="Jewelry Polishing"
                  className="w-full h-60 object-cover rounded-t-3xl opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-all duration-300 rounded-t-3xl"></div>
              </div>
              <div className="p-8 text-center relative z-10">
                <FaRegLightbulb className="text-4xl text-indigo-600 mb-4 transform group-hover:scale-110 transition-all duration-300" />
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 leading-tight">
                  5. Polishing
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 opacity-90">
                  Have your jewelry professionally polished periodically to
                  maintain its luster and remove any tarnish or oxidation.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default JewelryCare;
