import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Directory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("");

  useEffect(() => {
    fetchDirectory();
  }, []);

  const fetchDirectory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/profile/directory?page=0&size=100");

      if (res.data?.content) {
        setData(res.data.content);
      } else if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to load directory", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((a) => {
    const searchText = search.toLowerCase();

    return (
      (search === "" ||
        (a?.name ?? "").toLowerCase().includes(searchText) ||
        (a?.skills ?? "").toLowerCase().includes(searchText) ||
        (a?.company ?? "").toLowerCase().includes(searchText) ||
        (a?.program ?? "").toLowerCase().includes(searchText)) &&
      (year === "" || String(a?.passingYear ?? "") === year) &&
      (program === "" || (a?.program ?? "") === program)
    );
  });

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h2 style={styles.heading}>Alumni Directory</h2>
      <p style={styles.subHeading}>
        Explore and connect with alumni across programs and years
      </p>

      {/* SEARCH */}
      <input
        placeholder="Search alumni (name, skill, company, program)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* FILTERS */}
      <div style={styles.filters}>
        <select style={styles.select} onChange={(e) => setProgram(e.target.value)}>
          <option value="">Program</option>
          <option value="Computer Engineering">CSE</option>
          <option value="Information Technology">IT</option>
          <option value="Electronics and Communication">ECE</option>
          <option value="Mechanical Engineering">MECHANICAL</option>
          <option value="Chemical Engineering">CHEMICAL</option>
          <option value="Production Engineering">PRODUCTION</option>
          <option value="Agriculture Engineering">AGRICULTURE</option>
        </select>

        <select style={styles.select} onChange={(e) => setYear(e.target.value)}>
          <option value="">Passing Year</option>
          {Array.from({ length: 57 }, (_, i) => 1970 + i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>
        {loading ? (
          <p style={styles.loading}>Loading directory...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Year</th>
                <th>Company</th>
                <th>City</th>
                <th>Skills</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((a, i) => (
                <tr key={i} style={styles.row}>
                  <td style={styles.nameCell}>{a?.name}</td>
                  <td>{a?.email || "—"}</td>
                  <td>{a?.program}</td>
                  <td>{a?.passingYear}</td>
                  <td>{a?.company || "—"}</td>
                  <td>{a?.city || "—"}</td>
                  <td>{a?.skills || "—"}</td>
                  <td>{a?.phone || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filteredData.length === 0 && !loading && (
          <p style={styles.noData}>No alumni found.</p>
        )}
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
    marginBottom: "25px",
    fontSize: "15px",
  },

  search: {
    width: "100%",
    maxWidth: "600px",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    outline: "none",
    marginBottom: "18px",
    boxShadow: "0 4px 12px rgba(37,99,235,0.08)",
  },

  filters: {
    display: "flex",
    gap: "14px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  select: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    background: "#ffffff",
    fontWeight: "500",
    boxShadow: "0 4px 10px rgba(37,99,235,0.08)",
  },

  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 18px 35px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },

  loading: {
    color: "#1d4ed8",
    fontWeight: "600",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },

  row: {
    borderBottom: "1px solid #e2e8f0",
    transition: "background 0.2s ease",
  },

  nameCell: {
    fontWeight: "600",
    color: "#1e3a8a",
  },

  noData: {
    marginTop: "18px",
    color: "#64748b",
    fontWeight: "500",
  },
};