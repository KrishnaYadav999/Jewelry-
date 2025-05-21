import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Backend URL for WhatsApp notifications
const BACKEND_WHATSAPP_URL = "https://jewelry-backend-gq4y.onrender.com/api/send-whatsapp";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const notifyUserViaWhatsApp = async (phoneNumber, message) => {
    try {
      const response = await fetch(BACKEND_WHATSAPP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneNumber, message }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("WhatsApp notification sent!");
      } else {
        console.error("Failed to send WhatsApp message:", data.error);
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  };

  // Check stock and notify user
  useEffect(() => {
    cartItems.forEach((item) => {
      if (item.quantity >= item.stockThreshold && item.inStock) {
        const message = `${item.name} is running low on stock! Purchase soon to ensure availability.`;
        notifyUserViaWhatsApp("+911234567890", message); // Replace with user's phone number
      }
    });
  }, [cartItems]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row p-6 max-w-5xl mx-auto">
        <div className="flex-1 mr-8 mt-24">
          <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-lg text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between p-4 border-b border-gray-300"
                >
                  <div className="flex items-start">
                    <img
                      src={item.image || "/placeholder-image.jpg"} // Fallback to placeholder if image is not available
                      alt={item.name || "Product"}
                      className="w-24 h-24 object-cover mr-4 rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.name || "Product Name"}
                      </h3>
                      <p className="text-gray-600">
                        ₹{item.price ? item.price.toFixed(2) : "0.00"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Size: {item.size || "N/A"}
                      </p>
                      <p className="text-green-500 text-sm mt-1">
                        {item.inStock ? "In stock" : "Ships in 3–4 weeks"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        const updatedCart = [...cartItems];
                        updatedCart[index].quantity -= 1;
                        setCartItems(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                      }}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity || 1}</span>
                    <button
                      onClick={() => {
                        const updatedCart = [...cartItems];
                        updatedCart[index].quantity += 1;
                        setCartItems(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                      }}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        const updatedCart = cartItems.filter((_, i) => i !== index);
                        setCartItems(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                      }}
                      className="text-red-500 hover:text-red-700 font-semibold ml-4"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full lg:w-1/3 lg:mt-14 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold">Subtotal</span>
            <span className="text-lg font-semibold">
              ₹
              {cartItems
                .reduce(
                  (total, item) =>
                    total + item.price * (item.quantity || 1),
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => alert("Proceeding to checkout...")}
            className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
