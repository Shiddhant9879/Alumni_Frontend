import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user?.role !== "ADMIN") {
    return <p style={{ marginLeft: "200px" }}>Unauthorized</p>;
  }

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    prn: "",
    phoneNumber: "",
    btechBranch: "",
    passingYear: "",
    cgpa: "",
    industry: "",
    experienceYears: "",
    currentCompany: "",
    skills: "",
    achievements: "",
  });

  useEffect(() => {
    api
      .get("/api/profile")
      .then((res) => {
        if (res.data) {
          setForm({
            name: res.data.name || "",
            prn: res.data.prn || "",
            phoneNumber: res.data.phoneNumber || "",
            btechBranch: res.data.btechBranch || "",
            passingYear: res.data.passingYear || "",
            cgpa: res.data.cgpa || "",
            industry: res.data.industry || "",
            experienceYears: res.data.experienceYears || "",
            currentCompany: res.data.currentCompany || "",
            skills: res.data.skills || "",
            achievements: res.data.achievements || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      await api.post("/api/profile", form);
      alert("✅ Alumni profile saved successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Alumni Profile Builder (Admin)</h2>

        {/* ================= ACADEMIC ================= */}
        <h3 style={styles.sectionTitle}>Academic Details</h3>

        <input style={styles.input} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input style={styles.input} name="prn" placeholder="PRN" value={form.prn} onChange={handleChange} />
        <input style={styles.input} name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} />
        <input style={styles.input} name="btechBranch" placeholder="BTech Branch" value={form.btechBranch} onChange={handleChange} />
        <input style={styles.input} name="passingYear" placeholder="Passing Year" value={form.passingYear} onChange={handleChange} />
        <input style={styles.input} name="cgpa" placeholder="CGPA" value={form.cgpa} onChange={handleChange} />

        <hr style={styles.divider} />

        {/* ================= PROFESSIONAL ================= */}
        <h3 style={styles.sectionTitle}>Professional Details</h3>

        <input style={styles.input} name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} />
        <input style={styles.input} name="experienceYears" placeholder="Experience (Years)" value={form.experienceYears} onChange={handleChange} />
        <input style={styles.input} name="currentCompany" placeholder="Current Company" value={form.currentCompany} onChange={handleChange} />

        <hr style={styles.divider} />

        {/* ================= SKILLS ================= */}
        <h3 style={styles.sectionTitle}>Skills & Achievements</h3>

        <input style={styles.input} name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} />

        <textarea
          name="achievements"
          placeholder="Achievements"
          value={form.achievements}
          onChange={handleChange}
          style={styles.textarea}
        />

        <div style={styles.actions}>
          <button onClick={saveProfile} disabled={loading} style={styles.primaryBtn}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
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

  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },

  heading: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "20px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "12px",
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
    height: "120px",
    resize: "none",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    boxShadow: "0 4px 12px rgba(37,99,235,0.08)",
    fontSize: "14px",
  },

  divider: {
    margin: "24px 0",
    border: "none",
    borderTop: "1px solid #e2e8f0",
  },

  actions: {
    marginTop: "25px",
    textAlign: "right",
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
};
