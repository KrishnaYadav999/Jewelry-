import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // For Sun and Moon icons

const AdminNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark/Light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Toggle the dark mode class on the body element
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {/* Logo and Admin Panel Name */}
        <div className="flex items-center space-x-4 ml-72">
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Panel
          </Link>
        </div>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
