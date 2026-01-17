import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <div className="module-page">
      {/* MAIN DASHBOARD CARD */}
      <div className="app-card" style={styles.card}>
        <h2>Welcome to Alumni Management System</h2>
        <p>
          Connect, network, and grow with alumni and faculty of the institution.
        </p>

        {/* AUTH ACTIONS */}
        {!token && (
          <div style={styles.actions}>
            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              style={{ marginLeft: "12px" }}
            >
              Register
            </button>
          </div>
        )}

        {token && (
          <p style={styles.loggedInText}>
            ✅ You are logged in
          </p>
        )}
      </div>

      {/* LEADERSHIP SECTION */}
      <div className="app-card" style={styles.leadership}>
        <h3>Institutional Leadership</h3>

        <div style={styles.list}>
          <div>
            <strong>Dean</strong>
            <p>Dr. Ramesh Kumar</p>
          </div>

          <div>
            <strong>Vice Principal</strong>
            <p>Dr. Sunita Verma</p>
          </div>

          <div>
            <strong>Vice Chancellor</strong>
            <p>Prof. A.K. Sharma</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "800px",
    margin: "40px auto",
    textAlign: "center",
  },
  actions: {
    marginTop: "20px",
  },
  loggedInText: {
    marginTop: "15px",
    color: "#16a34a",
    fontWeight: "600",
  },
  leadership: {
    maxWidth: "800px",
    margin: "20px auto",
  },
  list: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
};
