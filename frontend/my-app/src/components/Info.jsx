import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Offer from "./Offer";

const Info = () => {
  return (
    <div>
      <div className="mt-14">
        <Offer />
      </div>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section
          className="bg-cover bg-center h-96 flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://wallpapercave.com/wp/wp8149620.jpg')",
          }}
        >
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 mt-5">Buy 1 Get 1 Free!</h1>
            <p className="text-xl mb-8">
              Explore our stunning collection of jewelry and enjoy our exclusive
              offer. Limited time only!
            </p>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300">
              Shop Now
            </button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Earrings */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://img0.etsystatic.com/133/0/7257764/il_fullxfull.914430224_dvdn.jpg"
                alt="Earrings"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Earrings</h3>
                <p className="text-gray-600 mb-4">
                  Elevate your style with our exquisite earrings collection.
                  From minimalist studs to statement chandeliers, find the
                  perfect pair for every occasion.
                </p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  View Earrings
                </button>
              </div>
            </div>

            {/* Bracelets */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F26%2F23%2F2623b406a930a39eace2ffd7dcd870923f745c19.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
                alt="Bracelets"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bracelets</h3>
                <p className="text-gray-600 mb-4">
                  Adorn your wrists with our stunning bracelets. Whether you
                  prefer delicate chains or bold cuffs, our collection has
                  something for every taste.
                </p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  View Bracelets
                </button>
              </div>
            </div>

            {/* Bangles */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3a%2F36%2F3a369f5b2da0d13c878cfd4a90cc1ad5e1c9564b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
                alt="Bangles"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bangles</h3>
                <p className="text-gray-600 mb-4">
                  Add a touch of tradition and elegance with our bangles.
                  Perfect for weddings, festivals, or everyday wear, our bangles
                  are crafted to perfection.
                </p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  View Bangles
                </button>
              </div>
            </div>

            {/* Earrings Combo */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://n2.sdlcdn.com/imgs/j/d/5/Estele-Oxidized-Silver-Earrings-Combo-SDL236916368-1-179b3.jpg"
                alt="Earrings Combo"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Earrings Combo</h3>
                <p className="text-gray-600 mb-4">
                  Get the best of both worlds with our earrings combos. Mix and
                  match styles to create a unique look that’s all your own.
                </p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  View Combos
                </button>
              </div>
            </div>

            {/* Rings */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://th.bing.com/th/id/OIP.vjIvcVnj_t25NTxYUfQYbgHaHa?rs=1&pid=ImgDetMain"
                alt="Rings"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Rings</h3>
                <p className="text-gray-600 mb-4">
                  Find the perfect ring for every occasion. From elegant
                  solitaires to intricate designs, our rings are crafted to make
                  a statement.
                </p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  View Rings
                </button>
              </div>
            </div>

            {/* Pendant Set */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F18%2F34%2F18341f17f3629421fcb08297350f3e1b76d54815.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
                alt="Pendant Set"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Pendant Set</h3>
                <p className="text-gray-600 mb-4">
                  Enhance your look with our beautiful pendant sets. Perfect for
                  adding a touch of sophistication to any outfit.
                </p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  View Pendant Sets
                </button>
              </div>
            </div>

            {/* Necklace Set */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://img0.etsystatic.com/122/0/7371176/il_fullxfull.953585722_b1xd.jpg"
                alt="Necklace Set"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Necklace Set</h3>
                <p className="text-gray-600 mb-4">
                  Make a statement with our exquisite necklace sets. Perfect for
                  weddings, parties, or any special occasion.
                </p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  View Necklace Sets
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Info;
