import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("https://jewelry-backend-gq4y.onrender.com/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure correct token
        },
      })
      .then((response) => {
        // Check if data is returned
        if (response.data && response.data.length > 0) {
          setUserData(response.data);
        } else {
          setUserData([]); // In case there's no data
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUserData([]); // Handle error gracefully
      });
  }, []);

  if (userData === null) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  if (userData.length === 0) {
    return <div>No user data available</div>; // No data case
  }

  return (
    <div>
      <h1>User Accounts</h1>
      <ul>
        {userData.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountPage;
