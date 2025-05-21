import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin/dashboard"); // redirect inside admin
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white tracking-wide">
          Admin Panel Login
        </h2>
        <p className="text-sm text-gray-300 text-center">
          Authorized personnel only. Please enter your password.
        </p>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-3 rounded-lg text-white font-semibold tracking-wide"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin
