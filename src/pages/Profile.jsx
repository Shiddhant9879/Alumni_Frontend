import { useState } from "react";
import ProfileTable from "./ProfileTable";
import ModelProfile from "./ModelProfile";
import api from "../api/axios";

/* MODEL STUDENTS (STATIC DEMO DATA) */
const modelStudents = [
  {
    name: "Rohit Sharma",
    branch: "Computer Science",
    year: "2022",
    cgpa: "8.6",
    industry: "Software Development",
    experience: "2",
    company: "Infosys",
    skills: "Java, Spring Boot, SQL",
    achievements: "Led final year project, Hackathon winner",
  },
  {
    name: "Ananya Verma",
    branch: "Information Technology",
    year: "2023",
    cgpa: "9.1",
    industry: "Data Analytics",
    experience: "1",
    company: "Deloitte",
    skills: "Python, Power BI, Statistics",
    achievements: "Top 5% of batch, Research paper published",
  },
];

export default function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [view, setView] = useState("form");

  const [form, setForm] = useState({
    branch: "",
    year: "",
    cgpa: "",
    industry: "",
    experience: "",
    company: "",
    skills: "",
    achievements: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const saveProfile = async () => {
  try {
    await api.post("/api/profile", form);
    alert("Profile saved to database");

    setForm({
      branch: "",
      year: "",
      cgpa: "",
      industry: "",
      experience: "",
      company: "",
      skills: "",
      achievements: "",
    });
  } catch (err) {
    alert("Failed to save profile");
  }
};
  /* ======================
     VIEW SWITCHING LOGIC
     ====================== */

  if (view === "table") {
    return (
      <ProfileTable
        profiles={profiles}
        onBack={() => setView("form")}
      />
    );
  }

  if (view === "model1") {
    return (
      <ModelProfile
        student={modelStudents[0]}
        onBack={() => setView("form")}
      />
    );
  }

  if (view === "model2") {
    return (
      <ModelProfile
        student={modelStudents[1]}
        onBack={() => setView("form")}
      />
    );
  }

  /* ======================
     PROFILE ENTRY FORM
     ====================== */

  return (
    <div className="module-page">
      <div className="app-card" style={styles.card}>

        {/* Academic */}
        <h3>Academic Details</h3>
        <input name="branch" placeholder="BTech Branch" value={form.branch} onChange={handleChange} />
        <input name="year" placeholder="Passing Year" value={form.year} onChange={handleChange} />
        <input name="cgpa" placeholder="CGPA" value={form.cgpa} onChange={handleChange} />

        <hr />

        {/* Professional */}
        <h3>Professional Details</h3>
        <input name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} />
        <input name="experience" placeholder="Experience (years)" value={form.experience} onChange={handleChange} />
        <input name="company" placeholder="Current Company" value={form.company} onChange={handleChange} />

        <hr />

        {/* Skills */}
        <h3>Skills & Achievements</h3>
        <input name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} />
        <textarea
          name="achievements"
          placeholder="Achievements"
          value={form.achievements}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            height: "120px",
            resize: "none",
            marginBottom: "14px",
          }}
        />

        <div style={styles.actions}>
          <button onClick={saveProfile}>Save Profile</button>

          <button onClick={() => setView("table")} style={{ marginLeft: "10px" }}>
            View Profiles
          </button>

          <button onClick={() => setView("model1")} style={{ marginLeft: "10px" }}>
            View Model Student 1
          </button>

          <button onClick={() => setView("model2")} style={{ marginLeft: "10px" }}>
            View Model Student 2
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "800px",
    marginLeft: "200px",
  },
  actions: {
    marginTop: "20px",
  },
};
