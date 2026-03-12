import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/events");

      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Failed to load events", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!title || !date) {
      alert("Title and date required");
      return;
    }

    try {
      await api.post("/api/events", {
        title,
        description,
        eventDate: date,
      });

      alert("✅ Event created successfully");

      setTitle("");
      setDescription("");
      setDate("");

      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create event");
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <p style={styles.subHeading}>
        Manage institutional events and announcements
      </p>

      {/* ================= POST EVENT ================= */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Post Event</h3>

        <form onSubmit={handleCreateEvent}>
          <input
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.primaryBtn}>
            Post Event
          </button>
        </form>
      </div>

      {/* ================= EVENT MANAGEMENT ================= */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Event Management</h3>

        {loading && <p style={styles.loading}>Loading events...</p>}

        {!loading && events.length === 0 && (
          <p style={styles.empty}>No events posted yet</p>
        )}

        {events.map((event) => (
          <div key={event.id} style={styles.eventItem}>
            <p style={styles.eventTitle}>
              <b>Title:</b> {event.title}
            </p>
            <p style={styles.eventDesc}>
              <b>Description:</b> {event.description || "—"}
            </p>
            <p style={styles.eventDate}>
              <b>Date:</b>{" "}
              {event.eventDate
                ? new Date(event.eventDate).toLocaleDateString()
                : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= DEEP BLUE CORPORATE STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
    padding: "40px 30px",
    fontFamily: "Inter, sans-serif",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "6px",
  },

  subHeading: {
    color: "#475569",
    marginBottom: "30px",
    fontSize: "15px",
  },

  card: {
    background: "#ffffff",
    padding: "26px",
    borderRadius: "18px",
    marginBottom: "28px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    outline: "none",
    boxShadow: "0 4px 12px rgba(37,99,235,0.08)",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    padding: "12px 14px",
    minHeight: "90px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    boxShadow: "0 4px 12px rgba(37,99,235,0.08)",
    fontSize: "14px",
    resize: "none",
  },

  primaryBtn: {
    padding: "12px 22px",
    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(37,99,235,0.25)",
    transition: "all 0.2s ease",
  },

  loading: {
    color: "#1d4ed8",
    fontWeight: "600",
  },

  empty: {
    color: "#64748b",
    fontWeight: "500",
  },

  eventItem: {
    padding: "14px",
    borderBottom: "1px solid #e2e8f0",
  },

  eventTitle: {
    color: "#1e3a8a",
    fontWeight: "600",
    marginBottom: "4px",
  },

  eventDesc: {
    color: "#475569",
    marginBottom: "4px",
    fontSize: "14px",
  },

  eventDate: {
    color: "#0f172a",
    fontSize: "14px",
  },
};
