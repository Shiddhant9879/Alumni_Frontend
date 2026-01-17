import { useState } from "react";

/* TEMP DATA — BACKEND KE TIME DB SE AAYEGA */
const alumniData = [
  {
    name: "Rohit Sharma",
    role: "Alumni",
    program: "B.Tech CSE",
    year: "2022",
    city: "New Delhi",
    company: "Infosys",
    skills: "Java, Spring Boot",
    collegeEmail: "rohit@college.edu",
    personalEmail: "rohit@gmail.com",
    phone: "9XXXXXXXX1",
  },
  {
    name: "Ananya Verma",
    role: "Alumni",
    program: "B.Tech IT",
    year: "2023",
    city: "Pune",
    company: "Deloitte",
    skills: "Python, Data Analytics",
    collegeEmail: "ananya@college.edu",
    personalEmail: "ananya@gmail.com",
    phone: "9XXXXXXXX2",
  },
  {
    name: "Dr. Amit Kumar",
    role: "Faculty",
    program: "B.Tech CSE",
    year: "2018",
    city: "Mumbai",
    company: "Computer Science Dept.",
    skills: "AI, Research",
    collegeEmail: "amit@college.edu",
    personalEmail: "-",
    phone: "-",
  },
];

export default function Directory() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("");
  const [city, setCity] = useState("");

  /* OPTIMIZED CLIENT-SIDE FILTERING */
  const filteredData = alumniData.filter((a) => {
    return (
      (search === "" ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.skills.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase())) &&
      (role === "" || a.role === role) &&
      (year === "" || a.year === year) &&
      (program === "" || a.program === program) &&
      (city === "" || a.city === city)
    );
  });

  return (
    <div className="module-page">
      {/* SEARCH */}
      <input
        placeholder="Search alumni (name, skill, company)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* FILTERS */}
      <div style={styles.filters}>
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Role</option>
          <option>Alumni</option>
          <option>Faculty</option>
        </select>

        <select onChange={(e) => setYear(e.target.value)}>
          <option value="">Year of Joining</option>
          <option>2018</option>
          <option>2022</option>
          <option>2023</option>
        </select>

        <select onChange={(e) => setProgram(e.target.value)}>
          <option value="">Program</option>
          <option>B.Tech CSE</option>
          <option>B.Tech IT</option>
        </select>

        <select onChange={(e) => setCity(e.target.value)}>
          <option value="">Current City</option>
          <option>New Delhi</option>
          <option>Pune</option>
          <option>Mumbai</option>
        </select>
      </div>

      {/* LOCATION RECOMMENDATIONS */}
      <div style={styles.locations}>
        {["New Delhi", "Pune", "Mumbai"].map((c) => (
          <div key={c} style={styles.locationBox} onClick={() => setCity(c)}>
            {c}
          </div>
        ))}
      </div>

      {/* RESULTS TABLE */}
      <div className="app-card" style={{ marginLeft: "200px", maxWidth: "1100px" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Program</th>
              <th>Year</th>
              <th>City</th>
              <th>Company</th>
              <th>Skills</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((a, i) => (
              <tr key={i}>
                <td>{a.name}</td>
                <td>{a.role}</td>
                <td>{a.program}</td>
                <td>{a.year}</td>
                <td>{a.city}</td>
                <td>{a.company}</td>
                <td>{a.skills}</td>
                <td>
                  {a.collegeEmail}
                  <br />
                  {a.personalEmail}
                  <br />
                  {a.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <p style={{ marginTop: "15px" }}>No matching alumni found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  search: {
    width: "60%",
    padding: "10px",
    marginLeft: "200px",
    marginBottom: "15px",
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginLeft: "200px",
    marginBottom: "20px",
  },
  locations: {
    display: "flex",
    gap: "15px",
    marginLeft: "200px",
    marginBottom: "20px",
  },
  locationBox: {
    padding: "10px 20px",
    background: "#e5e7eb",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
