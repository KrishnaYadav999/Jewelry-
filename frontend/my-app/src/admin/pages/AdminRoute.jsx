// ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute  = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
