import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "ALUMNI",
    prn: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Name, email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>
          Alumni Management System
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
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

          <input
            name="prn"
            placeholder="PRN Number"
            value={form.prn}
            onChange={handleChange}
            style={styles.input}
          />

          <select name="role" value={form.role} onChange={handleChange}>
  <option value="STUDENT">Student</option>
  <option value="ALUMNI">Alumni</option>
  <option value="FACULTY">Faculty</option>
</select>


          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b1c2d",
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  title: {
    marginBottom: "5px",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#555",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "13px",
  },
};
