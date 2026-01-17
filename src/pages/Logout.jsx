import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("✅ You have been logged out successfully");
    navigate("/");
  };

  return (
    <div className="module-page">
      <div className="app-card" style={{ marginLeft: "200px", maxWidth: "500px" }}>
        <h3>Logout</h3>

        <p><strong>Email:</strong> {user?.email}</p>

        <button onClick={handleLogout}>
          Confirm Logout
        </button>
      </div>
    </div>
  );
}
