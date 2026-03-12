import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EventRegister() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    name: "",
    prn: "",
    email: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get("/api/events").then((res) => {
      const found = res.data.find(
        (e) => String(e.id) === String(eventId)
      );
      setEvent(found);
    });
  }, [eventId]);

  if (!event) {
    return <p style={{ marginLeft: "200px" }}>Loading event...</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    if (!form.name || !form.prn || !form.email || !form.phone) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await api.post("/api/event-registrations", {
        userId: user.id,
        eventId: event.id,
      });

      setSuccess(true);
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) {
        alert("Already registered for this event");
      } else {
        alert("Registration failed");
      }
    }
  };

  const goBack = () => {
    navigate("/events");
  };

  return (
    <div className="module-page">
      <div
        className="app-card"
        style={{ marginLeft: "200px", maxWidth: "700px" }}
      >
        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <p><strong>Date:</strong> {event.eventDate}</p>

        <hr />

        {success ? (
          <div style={styles.successBox}>
            <p>
              ✅ You have successfully registered for{" "}
              <strong>{event.title}</strong>
            </p>

            <button onClick={goBack}>Back to Events</button>
          </div>
        ) : (
          <>
            <h4>Event Registration</h4>

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="prn"
              placeholder="PRN Number"
              value={form.prn}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="email"
              placeholder="College Email ID"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="phone"
              placeholder="Contact Number"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
            />

            <button onClick={submitForm} style={{ marginTop: "10px" }}>
              Confirm Registration
            </button>

            <button onClick={goBack} style={{ marginLeft: "10px" }}>
              Back to Events
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
  },
  successBox: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
};
