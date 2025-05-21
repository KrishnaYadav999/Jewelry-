import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Offer from "./Offer";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleConfirmOrder = async () => {
    if (!address1 || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    if (paymentMethod === "cod") {
      alert("Order placed with Cash on Delivery.");
      // Pass data to ProgressTracker for display
      navigate("/ProgressTracker", {
        state: {
          address1,
          address2,
          productName: product.name,
          price: product.price,
          size: product.size,
          orderId: generateOrderId(),
          currentStatus: "Ordered",
        },
      });
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: product.price,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount * 100, // paise
        currency: "INR",
        name: "Your Company Name",
        description: `Payment for ${product.name}`,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post("http://localhost:5000/api/payments/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              alert("Payment Successful!");
              navigate("/ProgressTracker", {
                state: {
                  address1,
                  address2,
                  productName: product.name,
                  price: product.price,
                  size: product.size,
                  orderId: data.orderId,
                  currentStatus: "Ordered",
                },
              });
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification error. Please contact support.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        const errorDesc = response.error?.description || "";
        if (errorDesc.includes("International cards are not supported")) {
          alert("Sorry, international cards are not supported. Please use an Indian card or choose Cash on Delivery.");
        } else {
          alert("Payment Failed: " + errorDesc);
        }
      });
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  // Simple Order ID generator for demo (replace with backend ID)
  function generateOrderId() {
    return "ORD" + Math.floor(Math.random() * 1000000);
  }

  if (!product) {
    return <div className="text-center mt-20">No product selected.</div>;
  }

  return (
    <>
      <div className="">
        <Offer/>
      </div>
      <Navbar />

      <div className="container mx-auto p-4 mt-20 max-w-md">
        <h2 className="text-2xl font-bold mb-4 mt-32">Checkout</h2>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <input
            type="text"
            placeholder="Address Line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address Line 2 (Optional)"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Payment Method</option>
            <option value="razorpay">Razorpay</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="border p-4 rounded">
            <p className="font-semibold">{product.name}</p>
            <p>Price: ₹{product.price}.00</p>
            <p>Size: {product.size}</p>
            <p>Delivery: 2–7 days</p>
          </div>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg"
        >
          Confirm Order
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
