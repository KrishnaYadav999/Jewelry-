import React, { useState } from "react";

const Sidebar = ({ setActivePage, activePage, isOpen, setIsOpen }) => {
  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Orders", icon: "📦" },
    { name: "Products", icon: "🛒" },
    { name: "Customers", icon: "👥" },
    { name: "Analytics", icon: "📊" },
    { name: "Marketing", icon: "📣" },
    { name: "Discounts", icon: "🏷️" },
    { name: "ProductsPost", icon: "📮" }, // New ProductsPost Item
  ];

  return (
    <div className="relative">
      {/* Hamburger Menu */}
      <button
        className="p-4 bg-gray-800 text-white fixed top-4 left-4 z-20 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-10`}
      >
        <h1 className="text-2xl font-semibold mb-6 ml-32">Jewels</h1>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
                  activePage === item.name
                    ? "bg-gray-700"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
