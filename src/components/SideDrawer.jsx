import { Link } from "react-router-dom";

export default function SideDrawer() {
  return (
    <div className="side-drawer">
      <h3 className="drawer-title">Modules</h3>

      <Link to="/profile" className="drawer-link">
        Alumni Profile Builder
      </Link>

      <Link to="/directory" className="drawer-link">
        Alumni Directory
      </Link>

      <Link to="/events" className="drawer-link">
        Event Management
      </Link>
    </div>
  );
}
