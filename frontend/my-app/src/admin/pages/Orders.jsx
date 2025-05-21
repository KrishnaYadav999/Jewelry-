import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders"); // Update the API endpoint if needed
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders by search term and status
    const filterOrders = () => {
      let updatedOrders = orders;

      if (filterStatus !== "All") {
        updatedOrders = updatedOrders.filter(
          (order) => order.status === filterStatus
        );
      }

      if (searchTerm) {
        updatedOrders = updatedOrders.filter(
          (order) =>
            order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredOrders(updatedOrders);
    };

    filterOrders();
  }, [orders, filterStatus, searchTerm]);

  return (
    <div
      className={`p-8 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="px-4 py-2 mb-6 rounded-lg bg-blue-500 text-white"
      >
        Toggle Dark Mode
      </button>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Product Name or Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        {isLoading ? (
          <div className="p-6 text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <table className="table-auto w-full text-left">
            <thead>
              <tr className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Payment Method</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className={`hover:bg-blue-500 cursor-pointer ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">{order.productName}</td>
                  <td className="px-6 py-4">${order.price}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
