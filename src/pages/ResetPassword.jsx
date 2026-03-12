import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Invalid or missing reset token");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/users/reset-password", {
        token: token,
        newPassword: newPassword,
      });

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Reset failed. Token may be invalid or expired.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleReset} style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>

        {message && <p style={styles.message}>{message}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

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
  message: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "13px",
    color: "#333",
  },
};