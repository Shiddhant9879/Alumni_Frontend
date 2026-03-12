import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔒 Role restriction (only if route demands role)
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}