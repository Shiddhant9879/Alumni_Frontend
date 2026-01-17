import { useState } from "react";
import { useNavigate } from "react-router-dom";

const eventsData = [
  {
    id: 1,
    name: "Startup Fundraising Meet",
    type: "Startup",
    description:
      "An alumni-led startup fundraising event connecting founders with mentors and early-stage investors.",
    registrationDeadline: "25 Sep 2026",
    location: "College Auditorium",
    date: "2026-09-30",
  },
  {
    id: 2,
    name: "Industry-Oriented Coding Bootcamp",
    type: "Coding",
    description:
      "A hands-on coding bootcamp focused on problem-solving, system thinking, and industry practices.",
    registrationDeadline: "10 Oct 2026",
    location: "Computer Lab Block",
    date: "2026-10-15",
  },
  {
    id: 3,
    name: "Industrial Visit – Chakan",
    type: "Industrial Visit",
    description:
      "A guided industrial visit to manufacturing units in Chakan Industrial Area to understand real-world operations.",
    registrationDeadline: "05 Nov 2026",
    location: "Chakan, Pune",
    date: "2026-11-10",
  },
];

export default function Events() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("upcoming");
  const navigate = useNavigate();

  const filteredEvents = eventsData
    .filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="module-page">
      {/* SEARCH + FILTERS */}
      <div style={styles.topBar}>
        <input
          placeholder="Search events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="upcoming">Upcoming</option>
          <option value="nearest">Nearest</option>
        </select>
      </div>

      {/* CURRENT EVENTS */}
      <div className="app-card" style={styles.card}>
        <h3>Current Events</h3>

        <div style={styles.grid}>
          {filteredEvents.map((event) => (
            <div key={event.id} style={styles.eventCard}>
              <h4>{event.name}</h4>
              <p style={styles.type}>{event.type}</p>
              <p>{event.description}</p>

              <p>
                <strong>Registration Deadline:</strong>{" "}
                {event.registrationDeadline}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>

              {/* ONLY NAVIGATION — NO LOGIC */}
              <button
                onClick={() =>
                  navigate(`/events/register/${event.id}`)
                }
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EVENT HISTORY */}
      <div className="app-card" style={styles.card}>
        <h3>Past Events</h3>
        <p>Alumni Meet 2023</p>
        <p>Webinar on Higher Studies</p>
      </div>
    </div>
  );
}

const styles = {
  topBar: {
    display: "flex",
    gap: "15px",
    marginLeft: "200px",
    marginBottom: "20px",
  },
  search: {
    width: "60%",
    padding: "10px",
  },
  select: {
    padding: "10px",
  },
  card: {
    marginLeft: "200px",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  eventCard: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  type: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#2563eb",
  },
};
