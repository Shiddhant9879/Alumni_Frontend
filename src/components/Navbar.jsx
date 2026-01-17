import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // ❗ homepage only
  };

  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>
        Home
      </Link>

      {token && (
        <>
          <Link to="/profile" style={{ marginRight: "1rem", color: "#fff" }}>
            Profile
          </Link>
          <Link to="/events" style={{ marginRight: "1rem", color: "#fff" }}>
            Events
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      )}

      {!token && (
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
      )}
    </nav>
  );
}
