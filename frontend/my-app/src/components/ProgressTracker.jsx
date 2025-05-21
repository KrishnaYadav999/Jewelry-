import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaCheckCircle, FaTruck, FaBoxOpen, FaHome } from "react-icons/fa";
import axios from "axios";
import Offer from "./Offer";

const ProgressTracker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract passed state from location
  const { address1, address2, productName, price, orderId } = location.state || {};

  // Track current status & cancellation flag
  const [currentStatus, setCurrentStatus] = useState("Out for delivery");
  const [isCancelled, setIsCancelled] = useState(false);

  // Handler for cancel order
  const handleCancelOrder = async () => {
    if (!orderId) {
      alert("Order ID is missing. Cannot cancel order.");
      return;
    }

    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      // Call your backend API to cancel order using orderId
      const response = await axios.post("https://jewelry-backend-gq4y.onrender.com/api/orders/cancel", {
        orderId,
      });

      console.log("Cancel order response:", response.data);

      if (response.data.success) {
        setIsCancelled(true);
        setCurrentStatus("Cancelled");
        alert("Your order has been cancelled successfully.");
      } else {
        alert("Failed to cancel the order. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("An error occurred while cancelling the order.");
    }
  };

  // If no product info or orderId, show fallback message
  if (!productName || price === undefined || !orderId) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 mt-20 text-center">
          <h2 className="text-xl font-bold mb-4">Order details not found.</h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go to Home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="mt-14">
        <Offer />
      </div>
      <Navbar />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-8 mt-24 text-center">Order Status</h2>

        {/* Progress Tracker */}
        <div className="flex justify-between items-center relative mb-8">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0"></div>

          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                ["Ordered", "Shipped", "Out for delivery", "Delivered"].includes(currentStatus)
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <p className="mt-2 text-sm font-semibold">Ordered</p>
          </div>

          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                ["Shipped", "Out for delivery", "Delivered"].includes(currentStatus)
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <FaTruck className="text-white text-2xl" />
            </div>
            <p className="mt-2 text-sm font-semibold">Shipped</p>
          </div>

          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                ["Out for delivery", "Delivered"].includes(currentStatus)
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <FaBoxOpen className="text-white text-2xl" />
            </div>
            <p className="mt-2 text-sm font-semibold">Out for Delivery</p>
          </div>

          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStatus === "Delivered" ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <FaHome className="text-white text-2xl" />
            </div>
            <p className="mt-2 text-sm font-semibold">Delivered</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-semibold">
            Current Status:{" "}
            <span className={`${isCancelled ? "text-red-600" : "text-green-600"}`}>
              {currentStatus}
            </span>
          </p>
          {!isCancelled && (
            <button
              onClick={handleCancelOrder}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel Order
            </button>
          )}
        </div>

        <div className="border mt-12 rounded-lg p-6 max-w-lg mx-auto shadow-md">
          <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
          <p>{address1 || "Address Line 1 not available"}</p>
          <p>{address2 || "Address Line 2 not available"}</p>
        </div>

        <div className="border mt-6 rounded-lg p-6 max-w-lg mx-auto shadow-md">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <p className="font-semibold">{productName}</p>
          <p>Price: ₹{price}.00</p>
          <p>Delivery: 2–7 days</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProgressTracker;
