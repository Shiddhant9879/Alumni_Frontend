import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

/* SAME EVENT DATA (DB LATER) */
const eventsData = [
  {
    id: "1",
    name: "Startup Fundraising Meet",
    description:
      "An alumni-led startup fundraising event connecting founders with mentors and investors.",
    date: "30 Sep 2026",
    location: "College Auditorium",
  },
  {
    id: "2",
    name: "Industry-Oriented Coding Bootcamp",
    description:
      "Hands-on coding bootcamp focused on industry-ready problem solving.",
    date: "15 Oct 2026",
    location: "Computer Lab Block",
  },
  {
    id: "3",
    name: "Industrial Visit – Chakan",
    description:
      "Industrial exposure visit to manufacturing units at Chakan.",
    date: "10 Nov 2026",
    location: "Chakan, Pune",
  },
];

export default function EventRegister() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = eventsData.find((e) => e.id === String(eventId));

  const [form, setForm] = useState({
    name: "",
    prn: "",
    email: "",
    phone: "",
  });

  const [success, setSuccess] = useState(false);

  if (!event) {
    return (
      <p style={{ marginLeft: "200px" }}>
        Event not found. Please go back.
      </p>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    if (!form.name || !form.prn || !form.email || !form.phone) {
      alert("Please fill all required fields");
      return;
    }

    setSuccess(true);
  };

  const goBack = () => {
    setSuccess(false);
    setForm({
      name: "",
      prn: "",
      email: "",
      phone: "",
    });
    navigate("/events");
  };

  return (
    <div className="module-page">
      <div
        className="app-card"
        style={{ marginLeft: "200px", maxWidth: "700px" }}
      >
        <h3>{event.name}</h3>
        <p>{event.description}</p>

        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <hr />

        {/* SUCCESS MESSAGE */}
        {success && (
          <div style={styles.successBox}>
            <p>
              ✅ You have successfully registered for{" "}
              <strong>{event.name}</strong>
            </p>

            <button onClick={goBack}>
              Back to Events
            </button>
          </div>
        )}

        {/* REGISTRATION FORM */}
        {!success && (
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

            <button
              onClick={goBack}
              style={{ marginLeft: "10px" }}
            >
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
