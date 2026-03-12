import { Link } from "react-router-dom";

export default function SideDrawer() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return null;

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="side-drawer">
      <h3 className="drawer-title">Modules</h3>

      {/* ===== ADMIN MODULES ===== */}
      {isAdmin && (
        <>
          <Link to="/profile" className="drawer-link">
            Alumni Profile Builder
          </Link>


          <Link to="/events" className="drawer-link">
            Event Management
          </Link>
        </>
      )}

      {/* ===== NON-ADMIN MODULES ===== */}
      {!isAdmin && (
        <>
          <Link to="/directory" className="drawer-link">
            Alumni Directory
          </Link>

          <Link to="/events" className="drawer-link">
            Event Management
          </Link>
        </>
      )}
    </div>
  );
}