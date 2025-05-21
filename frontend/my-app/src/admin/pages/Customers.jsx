import React, { useState, useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountStatusFilter, setAccountStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        setIsLoading(true);

        // Fetch user data (Name, Email, Account Status)
        const usersResponse = await axios.get("http://localhost:5000/api/users");
        const usersData = usersResponse.data; // Assume the response is an array of user objects
        
        // Fetch order history data
        const ordersResponse = await axios.get("http://localhost:5000/api/orders");
        const ordersData = ordersResponse.data.orders; // Assuming orders data is in the 'orders' array

        // Merge users and their orders
        const mergedData = usersData.map((user) => {
          const userOrders = ordersData
            .filter((order) => order.userId === user._id) // Match orders by user ID
            .map((order) => ({
              orderID: order._id,
              price: order.price,
              date: order.date,
            }));

          return { ...user, orderHistory: userOrders };
        });

        setCustomers(mergedData); // Set merged data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching customers and orders:", error);
        setIsLoading(false);
      }
    };

    fetchCustomersData();
  }, []);

  // Handle page change for pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearchTerm =
      (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      accountStatusFilter === "All" || customer.accountStatus === accountStatusFilter;
    return matchesSearchTerm && matchesStatus;
  });

  // Pagination logic
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  return (
    <div className={`p-8 min-h-screen ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"}`}>
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="mb-4 py-2 px-4 rounded-lg bg-blue-500 text-white"
      >
        Toggle Dark Mode
      </button>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={accountStatusFilter}
          onChange={(e) => setAccountStatusFilter(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className={`overflow-x-auto ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md rounded-lg`}>
        {isLoading ? (
          <div className="p-6 text-center">
            <p className={darkMode ? "text-gray-300" : "text-gray-500"}>Loading...</p>
          </div>
        ) : (
          <table className="table-auto w-full text-left">
            <thead>
              <tr className={darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"}>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Account Status</th>
                <th className="px-6 py-3">Order History</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.accountStatus}</td>
                  <td className="px-6 py-4">
                    <ul className="space-y-2">
                      {customer.orderHistory.length > 0 ? (
                        customer.orderHistory.map((order, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-semibold">Order {order.orderID}:</span> ₹{order.price} on {new Date(order.date).toLocaleDateString()}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm">No orders</li>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`py-1 px-3 rounded-full text-sm ${
                        customer.accountStatus === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {customer.accountStatus === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center">
        <button
          className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-lg">{currentPage}</span>
        <button
          className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredCustomers.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;
