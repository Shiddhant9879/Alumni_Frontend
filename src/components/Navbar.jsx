import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>
        Home
      </Link>

      {token && (
        <button onClick={logout} style={{ color: "#fff", background: "none", border: "none", cursor: "pointer" }}>
          Logout
        </button>
      )}
    </nav>
  );
}
