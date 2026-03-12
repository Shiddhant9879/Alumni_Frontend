import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const [news, setNews] = useState([]);

  useEffect(() => {
    if (token && user.role && user.role !== "ADMIN") {
      setNews([
        {
          id: 1,
          title: "Semester Registration Notice",
          body: "Semester registration will begin from 20th September.",
        },
        {
          id: 2,
          title: "Alumni Meet 2026",
          body: "Annual alumni meet scheduled for January 2026.",
        },
      ]);
    } else {
      setNews([]);
    }
  }, [token, user.role]);

  return (
    <div style={styles.page}>

      {/* ================= NEWS ================= */}
      {token && user.role && user.role !== "ADMIN" && (
        <div style={styles.newsCard}>
          <h3 style={styles.sectionTitle}>College News & Announcements</h3>

          {news.length === 0 && <p style={styles.emptyText}>No announcements yet.</p>}

          {news.map((n) => (
            <div key={n.id} style={styles.newsItem}>
              <strong style={styles.newsTitle}>{n.title}</strong>
              <p style={styles.newsBody}>{n.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= MAIN CARD ================= */}
      <div style={styles.mainCard}>
        <h2 style={styles.heading}>Welcome to Alumni Management System</h2>
        <p style={styles.subtitle}>
          Connect, network, and grow with alumni and faculty of the institution.
        </p>

        {!token && (
          <div style={styles.actions}>
            <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}

        {token && user.role && (
          <div style={styles.actions}>
            <p style={styles.loggedInText}>
              Logged in as <b>{user.role}</b>
            </p>

            {user.role === "ADMIN" ? (
              <button style={styles.primaryBtn} onClick={() => navigate("/admin")}>
                Go to Admin Dashboard
              </button>
            ) : (
              <button style={styles.primaryBtn} onClick={() => navigate("/events")}>
                View Events
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= LEADERSHIP ================= */}
      <div style={styles.leadershipCard}>
        <h3 style={styles.sectionTitle}>Institutional Leadership</h3>

        <div style={styles.leadershipList}>
          <div style={styles.leaderBox}>
            <strong>Dean</strong>
            <p>Dr. Ramesh Kumar</p>
          </div>

          <div style={styles.leaderBox}>
            <strong>Vice Principal</strong>
            <p>Dr. Sunita Verma</p>
          </div>

          <div style={styles.leaderBox}>
            <strong>Vice Chancellor</strong>
            <p>Prof. A.K. Sharma</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= DEEP BLUE CORPORATE STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
    padding: "40px 20px",
    fontFamily: "Inter, sans-serif",
  },

  newsCard: {
    maxWidth: "900px",
    margin: "0 auto 30px",
    background: "#ffffff",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
  },

  newsItem: {
    padding: "14px 0",
    borderBottom: "1px solid #e2e8f0",
  },

  newsTitle: {
    fontSize: "16px",
    color: "#1e3a8a",
  },

  newsBody: {
    marginTop: "4px",
    color: "#475569",
    fontSize: "14px",
  },

  emptyText: {
    color: "#64748b",
    fontSize: "14px",
  },

  mainCard: {
    maxWidth: "900px",
    margin: "0 auto 30px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "40px 30px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#475569",
    maxWidth: "600px",
    margin: "0 auto",
  },

  actions: {
    marginTop: "28px",
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(37,99,235,0.25)",
    transition: "all 0.2s ease",
  },

  secondaryBtn: {
    padding: "12px 24px",
    background: "#f1f5f9",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  loggedInText: {
    marginBottom: "10px",
    color: "#16a34a",
    fontWeight: "600",
  },

  leadershipCard: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "18px",
    color: "#1e3a8a",
  },

  leadershipList: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },

  leaderBox: {
    flex: "1",
    minWidth: "180px",
    background: "#eff6ff",
    padding: "16px",
    borderRadius: "12px",
    textAlign: "center",
    border: "1px solid #dbeafe",
  },
};