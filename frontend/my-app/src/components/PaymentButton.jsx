import React from "react";
import axios from "axios";

const PaymentButton = ({ amount }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Create an order on the backend
      const { data } = await axios.post("/api/payments/create-order", {
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      // Debugging line to ensure key is loaded
      console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);

      // Step 2: Initialize Razorpay Payment
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Fetch from frontend .env
        amount: data.amount * 100, // Razorpay expects amount in paise (100 paise = 1 INR)
        currency: "INR",
        order_id: data.order.id, // Order ID from backend
        name: "Your Company Name",
        description: "Test Transaction",
        handler: async (response) => {
          try {
            // Step 3: Verify Payment
            const verifyRes = await axios.post(
              "/api/payments/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
            if (verifyRes.data.success) {
              alert("Payment Successful!");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            alert("Payment Verification Failed");
            console.error("Verification error", error);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      // Step 4: Open Razorpay Payment Modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("An error occurred while processing the payment. Please try again.");
      console.error("Payment error", error);
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
