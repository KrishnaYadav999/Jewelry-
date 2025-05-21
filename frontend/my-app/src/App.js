import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Offer from "./components/Offer";
import Navbar from "./components/Navbar";
import Ads from "./components/Ads";
import NewArrivals from "./components/NewArrivals";
import JewelryDisplay from "./components/JewelryDisplay";
import Bangles from "./components/Bangles";
import Bracelets from "./components/Bracelets";
import Footer from "./components/Footer";
import Mangalsutra from "./pages/Mangalsutra";
import BraceletsPage from "./pages/BraceletsPage";
import BanglesPage from "./pages/BanglesPage";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import ProductDetail from "./components/ProductDetail";
import EarringPage from "./pages/EarringPage";
import NecklaceSetPage from "./pages/NecklaceSetPage";
import RingPage from "./pages/Ring";
import PendantSetPage from "./pages/PendantSetPage";
import Register from "./components/Register";
import SignInCard from "./components/SignInCard";
import Checkout from "./components/Checkout";
import Sidebar from "./components/Sidebar";
import HomeContent from "./admin/pages/HomeContent";
import Orders from "./admin/pages/Orders";
import Products from "./admin/pages/Products";
import Customers from "./admin/pages/Customers";
import Analytics from "./admin/pages/Analytics";
import MarketingDashboard from "./admin/pages/MarketingDashboard";
import AdminNavbar from "./admin/pages/AdminNavbar";
import ProductsPost from "./admin/pages/ProductsPost";
import VideoCard from "./components/VideoCard";
import NotFoundPage from "./components/NotFoundPage"; 
import PaymentPage from './pages/PaymentPage';
import Chatbot from "./components/Chatbot";


import AccountPage from './components/AccountPage';
import ProgressTracker from "./components/ProgressTracker";
import Info from "./components/Info";
import Blogs from "./components/Blogs";
import CustomerReviewsFooter from "./components/CustomerReviewsFooter";
import JewelryCare from "./components/JewelryCare";
import StoreLocator from "./components/StoreLocator";
import Crf from "./components/Crf";
import EarringsComboPage from "./pages/EarringsComboPage";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRoute from "./admin/pages/AdminRoute"

const Home = () => {
  return (
    <>
      <Offer />
      <Navbar />
      <Ads />
      <NewArrivals />
      <JewelryDisplay />
      <Bangles />
      <Bracelets />

      <div className="min-h-scree p-8">
      <div className="grid grid-cols-2 gap-8">
        {/* VideoCard components with respective video sources and alt texts */}
        <VideoCard
          videoSrc="https://m.reliancejewels.com/resources_new/images/video/romancering.mp4"
          videoAlt="Video 1"
          index={0}
        />
        <VideoCard
          videoSrc="https://m.reliancejewels.com/resources_new/images/video/Vivaham.mp4"
          videoAlt="Video 2"
          index={1}
        />
        <VideoCard
          videoSrc="https://m.reliancejewels.com/resources_new/images/video/Bella.mp4"
          videoAlt="Video 3"
          index={2}
        />
        <VideoCard
          videoSrc="https://m.reliancejewels.com/resources_new/images/video/Aabhar.mp4"
          videoAlt="Video 4"
          index={3}
        />
      </div>
      <Footer />
    </div>
   
    </>
  );
};


const AdminLayout = () => {
  const [activePage, setActivePage] = useState("Home");
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility state

  // Check the initial theme when the component mounts (for persistent theme)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      if (savedTheme === "dark") {
        document.body.classList.add("dark");
      }
    }
  }, []);

  // Toggle Dark/Light mode and store preference in localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className={`flex ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Sidebar */}
      <Sidebar
        setActivePage={setActivePage}
        activePage={activePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1">
        {/* Navbar */}
        <AdminNavbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        {/* Main content area */}
        <main
          className={`p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          {activePage === "Home" && <HomeContent />}
          {activePage === "Orders" && <Orders />}
          {activePage === "Products" && <Products />}
          {activePage === "Customers" && <Customers />}
          {activePage === "Analytics" && <Analytics />}
          {activePage === "Marketing" && <MarketingDashboard />}
          {activePage === "Discounts" && "Discount"}
          {activePage === "ProductsPost" && <ProductsPost />}
        </main>
      </div>
    </div>
  );
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
    setShowSignIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <div>
      <Chatbot />
        <Routes>
           <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignInCard onClose={() => setShowSignIn(false)} onLogin={handleLogin} />} />
          <Route path="/pages/mangalsutra" element={<Mangalsutra />} />
          <Route path="/pages/earrings-combo" element={<EarringsComboPage />} />
          <Route path="/pages/BraceletsPage" element={<BraceletsPage />} />
          <Route path="/pages/BanglesPage" element={<BanglesPage />} />
          <Route path="/pages/EarringPage" element={<EarringPage />} />
          <Route path="/pages/NecklaceSetPage" element={<NecklaceSetPage />} />
          <Route path="/pages/RingPage" element={<RingPage />} />
          <Route path="/pages/PendantSetPage" element={<PendantSetPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ProgressTracker" element={<ProgressTracker />} />
          <Route path="/info" element={<Info />} />
          <Route path="/blogs" element={<Blogs />} />  
          <Route path="/blog/:id" element={<Blogs />} />  
          <Route path="/edit/:id" element={<Blogs />} />  
          <Route path="/account" element={<AccountPage />} />
          <Route path="/JewelryCare" element={<JewelryCare />} />
          <Route path="/StoreLocator" element={<StoreLocator />} />
          <Route path="/Crf" element={<Crf />} />


          <Route path="/cf" element={<CustomerReviewsFooter />} />
        </Routes>

        {!isLoggedIn && !showSignIn && (
          <div>
            <button onClick={() => setShowSignIn(true)}></button>
          </div>
        )}

        {showSignIn && !isLoggedIn && (
          <SignInCard onClose={() => setShowSignIn(false)} onLogin={handleLogin} />
        )}
      </div>
    </CartProvider>
  );
};

export default App;
