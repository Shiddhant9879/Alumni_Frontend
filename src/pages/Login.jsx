import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/users/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/events");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 forgot password API call
  const handleForgotPassword = async () => {
    try {
      setForgotMsg("");
      await api.post("/api/users/forgot-password/email", {
        email: forgotEmail,
      });
      setForgotMsg("Reset link generated successfully. Check console.");
      setForgotEmail("");
    } catch (err) {
      setForgotMsg("Failed to send reset link");
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔐 Forgot Password Trigger */}
        <p
          style={styles.forgotLink}
          onClick={() => setShowForgot(!showForgot)}
        >
          Forgot Password?
        </p>

        {/* 🔐 Forgot Password Form */}
        {showForgot && (
          <div style={styles.forgotBox}>
            <input
              type="email"
              placeholder="Enter registered email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              style={styles.input}
            />
            <button
              type="button"
              style={styles.button}
              onClick={handleForgotPassword}
            >
              Send Reset Link
            </button>
            {forgotMsg && (
              <p style={{ marginTop: "8px", fontSize: "13px" }}>
                {forgotMsg}
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

/* styles */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b1c2d",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "13px",
  },
  forgotLink: {
    marginTop: "12px",
    textAlign: "center",
    color: "#646cff",
    cursor: "pointer",
    fontSize: "14px",
  },
  forgotBox: {
    marginTop: "15px",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },
};