import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Sun and Moon icons from FontAwesome

const AdminNavbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Load dark mode preference from localStorage if available
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    // Apply or remove dark mode class from body
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // Save to localStorage for persistence
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Admin Panel Logo/Title */}
        <div className="ml-6 sm:ml-0">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            Admin Panel
          </Link>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
