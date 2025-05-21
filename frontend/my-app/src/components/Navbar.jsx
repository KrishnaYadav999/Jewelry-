import { useState, useEffect } from "react";
import {
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import SignInCard from "./SignInCard";
import "../App.css";
import { Link } from "react-router-dom";

// Sample product data (replace this with your actual data source)
const products = [
  {
    id: 1,
    name: "Mangalsutra",
    href: "http://localhost:3000/pages/mangalsutra",
    image:
      "https://zerakijewels.com/cdn/shop/files/New_arrivals_BANNER_ANKLETS.jpg?v=1723196559&width=1400",
    rating: 4.5,
    reviews: 20,
    price: 100,
    originalPrice: 120,
    discount: 10,
  },
  {
    id: 2,
    name: "Bangles",
    href: "#",
    image: "https://zerakijewels.com/cdn/shop/files/Ishika_Bangle_Set_of_4_Bangles.png?v=1736189597&width=700",
    rating: 4.0,
    reviews: 15,
    price: 200,
    originalPrice: 250,
    discount: 20,
  },
  {
    id: 3,
    name: "PendantSets",
    href: "/pages/BanglesPage",
    image: "https://priyaasi.com/cdn/shop/files/1_dda11f72-f6c1-404f-b96e-afb9c96b9078.jpg?v=1744890701&width=1080",
    rating: 4.8,
    reviews: 30,
    price: 150,
    originalPrice: 170,
    discount: 10,
  },
  {
    id: 4,
    name: "Necklace Set",
    href: "",
    image: "https://priyaasi.com/cdn/shop/files/JS-PR-10586-c.jpg?v=1724827680&width=1080",
    rating: 5.0,
    reviews: 25,
    price: 80,
    originalPrice: 100,
    discount: 20,
  },
  // Add more products as needed
];

const categories = [
  {
    name: "Jewelry",
    sections: [
      {
        items: [
          { name: "Earrings", href: "/pages/EarringPage" },
          { name: "Bracelets", href: "/pages/BraceletsPage" },
          { name: "Bangles", href: "/pages/BanglesPage" },
          { name: "Earrings Combo", href: "/pages/earrings-combo" },
          { name: "Rings", href: "/pages/RingPage" },
          { name: "Pendant Set", href: "/pages/PendantSetPage" },
          { name: "Necklace Set", href: "/pages/NecklaceSetPage" },
        ],
      },
    ],
  },
  // You can add more categories here if needed
];

const pages = [
  { name: "Bangles", href: "/pages/Banglespage" },
  { name: "Buy 1 Get 1 Free", href: "#" },
];

const Navbar = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mangalsutraOpen, setMangalsutraOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleMouseEnterCategory = () => setCategoryOpen(true);
  const handleMouseLeaveCategory = () => setCategoryOpen(false);
  const handleClickCategory = () => setCategoryOpen(false);

  const handleMouseEnterMangalsutra = () => setMangalsutraOpen(true);
  const handleMouseLeaveMangalsutra = () => setMangalsutraOpen(false);
  const handleClickMangalsutra = () => setMangalsutraOpen(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearchDropdown = () => setSearchOpen(!searchOpen);

  useEffect(() => {
    if (showSignIn) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showSignIn]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left Side: Logo, Categories and Pages */}
            <div className="flex space-x-6 items-center">
              {/* Logo */}
              <img src="/images/Aqua_(1)[1].png" alt="Aqua Image" className=" w-12"/>
              {/* By Category Dropdown for Desktop */}
              <div
                className="hidden md:block relative"
                onMouseEnter={handleMouseEnterCategory}
                onMouseLeave={handleMouseLeaveCategory}
                onClick={handleClickCategory}
              >
                <button className="px-3 py-2 text-gray-700 hover:text-gray-900">
                  By Category
                </button>
                {categoryOpen && (
                  <div className="absolute left-0 top-full bg-white shadow-lg p-6 w-[900px] z-10 rounded-md">
                    <div className="flex space-x-8">
                      {/* Left: Category Links */}
                      <div className="w-1/2">
                        <h3 className="font-bold text-gray-700 mb-3">
                          Categories
                        </h3>
                        <ul className="space-y-2">
                          {categories[0]?.sections[0]?.items?.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                {item.name}
                              </a>
                            </li>
                          )) || <li>No items available</li>}
                        </ul>
                      </div>
                      {/* Right: Featured Images */}
                      <div className="w-1/2 flex space-x-6">
                        {categories[0]?.featured?.map((featuredItem) => (
                          <div
                            key={featuredItem.name}
                            className="flex flex-col items-center"
                          >
                            <a href={featuredItem.href}>
                              <img
                                src={featuredItem.imageSrc}
                                alt={featuredItem.imageAlt}
                                className="w-40 h-40 object-cover"
                              />
                            </a>
                            <a
                              href={featuredItem.href}
                              className="mt-2 text-sm text-gray-700 hover:text-gray-900"
                            >
                              {featuredItem.name}
                            </a>
                          </div>
                        )) || (
                          <>
                            <div className="flex space-x-4">
                              {/* First Image */}
                              <div className=" w-32 h-44">
                                <img
                                  src="https://zerakijewels.com/cdn/shop/files/Mangalsutra2_5.jpg?v=1713513606&width=1000"
                                  alt="Mangalsutra"
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 hover:brightness-125"
                                />
                              </div>

                              {/* Second Image */}
                              <div className="w-32 h-44">
                                <img
                                  src="https://zerakijewels.com/cdn/shop/files/12_2e2525da-e36f-4563-a744-0622ae42431f.png?v=1713448000&width=1000"
                                  alt="Jewelry"
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 hover:grayscale-0 hover:brightness-125"
                                />
                              </div>

                              {/* Third Image */}
                              <div className="w-32 h-44">
                                <img
                                  src="https://zerakijewels.com/cdn/shop/files/Mangalsutra2_5.jpg?v=1713513606&width=1000"
                                  alt="Mangalsutra"
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 hover:brightness-125 hover:saturate-150"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mangalsutra Dropdown for Desktop */}
              <div
                className="hidden md:block relative"
                onMouseEnter={handleMouseEnterMangalsutra}
                onMouseLeave={handleMouseLeaveMangalsutra}
                onClick={handleClickMangalsutra}
              >
                <Link to="/pages/mangalsutra">
                  <button className="px-3 py-2 text-gray-700 hover:text-gray-900">
                    Mangalsutra
                  </button>
                </Link>
                {mangalsutraOpen && (
                  <div className="absolute left-0 top-full bg-white shadow-lg p-6 w-[900px] z-10 rounded-md">
                    <div className="flex space-x-8">
                      {/* Left: Mangalsutra Links */}
                      <div className="w-1/2">
                        <h3 className="font-bold text-gray-700 mb-3">
                          Mangalsutra
                        </h3>
                        <ul className="space-y-2">
                          {categories[1]?.sections[0]?.items?.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                {item.name}
                              </a>
                            </li>
                          )) || <li>No items available</li>}
                        </ul>
                      </div>
                      {/* Right: Featured Images */}
                      <div className="w-1/2 flex space-x-6">
                        {categories[1]?.featured?.map((featuredItem) => (
                          <div
                            key={featuredItem.name}
                            className="flex flex-col items-center"
                          >
                            <a href={featuredItem.href}>
                              <img
                                src={featuredItem.imageSrc}
                                alt={featuredItem.imageAlt}
                                className="w-40 h-40 object-cover"
                              />
                            </a>
                            <a
                              href={featuredItem.href}
                              className="mt-2 text-sm text-gray-700 hover:text-gray-900"
                            >
                              {featuredItem.name}
                            </a>
                          </div>
                        )) || (
                          <>
                            <div className="flex space-x-4">
                              {/* First Image */}
                              <div className="w-32 h-32">
                                <img
                                  src="https://zerakijewels.com/cdn/shop/files/Mangalsutra2_5.jpg?v=1713513606&width=1000"
                                  alt="Mangalsutra"
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 hover:brightness-125"
                                />
                              </div>

                              {/* Second Image */}
                              <div className="w-32 h-32">
                                <img
                                  src="https://zerakijewels.com/cdn/shop/files/12_2e2525da-e36f-4563-a744-0622ae42431f.png?v=1713448000&width=1000"
                                  alt="Jewelry"
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 hover:grayscale-0 hover:brightness-125"
                                />
                              </div>

                              {/* Third Image */}
                              <div className="w-32 h-32">
                                <img
                                  src="https://zerakijewels.com/cdn/shop/files/Mangalsutra2_5.jpg?v=1713513606&width=1000"
                                  alt="Mangalsutra"
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 hover:brightness-125 hover:saturate-150"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pages */}
              <div className="hidden md:block">
                {pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="px-3 py-2 text-gray-700 hover:text-gray-900"
                  >
                    {page.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side: Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearchDropdown}
                className="p-2 text-gray-700 hover:text-gray-900"
              >
                <FaSearch />
              </button>
              <Link to="/cart">
                <button className="p-2 text-gray-700 hover:text-gray-900">
                  <FaShoppingCart />
                </button>
              </Link>
              <button
                onClick={() => setShowSignIn(!showSignIn)}
                className="p-2 text-gray-700 hover:text-gray-900"
              >
                <FaUser />
              </button>
              <button
                className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col items-center py-4">
              <Link
                to="/pages/mangalsutra"
                className="py-2 text-gray-700 hover:text-gray-900"
              >
                Mangalsutra
              </Link>
              <Link
                to="/pages/Banglespage"
                className="py-2 text-gray-700 hover:text-gray-900"
              >
                Bangles
              </Link>
              <Link
                to="/pages/BraceletsPage"
                className="py-2 text-gray-700 hover:text-gray-900"
              >
                Bracelets
              </Link>
              {pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="py-2 text-gray-700 hover:text-gray-900"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Dropdown */}
      {searchOpen && (
        <div className="absolute top-16 left-0 right-0 z-20 bg-white shadow-lg p-4 mt-16">
          <input
            type="text"
            placeholder="Search for jewelry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`border border-gray-300 rounded-md w-full p-2 ${
              searchFocused ? "border-blue-500" : ""
            }`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="mt-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="flex items-center py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover mr-2"
                  />
                  <span className="text-gray-700">{product.name}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No products found</div>
            )}
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <SignInCard onClose={() => setShowSignIn(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
