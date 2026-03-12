import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/events")
      .then((res) => setEvents(res.data))
      .catch(() => setError("Failed to load events"));
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Upcoming Events</h2>
      <p style={styles.subHeading}>
        Stay updated with alumni meets, seminars, and institutional events
      </p>

      {error && <p style={styles.error}>{error}</p>}
      {events.length === 0 && !error && (
        <p style={styles.empty}>No events available</p>
      )}

      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
            <h3 style={styles.title}>{event.title}</h3>
            <p style={styles.description}>{event.description}</p>

            <p style={styles.date}>
              <b>Date:</b>{" "}
              {event.eventDate || event.date || "Not specified"}
            </p>

            {(user.role == "STUDENT") && (
              <button
                onClick={() =>
                  navigate(`/events/register/${event.id}`)
                }
                style={styles.primaryBtn}
              >
                Register
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
    padding: "40px 30px",
    fontFamily: "Inter, sans-serif",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "6px",
  },

  subHeading: {
    color: "#475569",
    marginBottom: "30px",
    fontSize: "15px",
  },

  error: {
    color: "#dc2626",
    fontWeight: "600",
    marginBottom: "15px",
  },

  empty: {
    color: "#64748b",
    fontWeight: "500",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 18px 35px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "8px",
  },

  description: {
    color: "#475569",
    fontSize: "14px",
    marginBottom: "12px",
    lineHeight: "1.5",
  },

  date: {
    fontSize: "14px",
    color: "#0f172a",
    marginBottom: "12px",
  },

  primaryBtn: {
    marginTop: "10px",
    padding: "10px 18px",
    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(37,99,235,0.25)",
    transition: "all 0.2s ease",
  },
};
