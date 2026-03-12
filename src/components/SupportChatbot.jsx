import { useState } from "react";

export default function SupportChatbot() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // show only for logged-in NON-ADMIN users
  if (!token || user.role === "ADMIN") return null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can we help you today?" },
  ]);

  const handleOption = (type) => {
    let reply = "";

    if (type === "inquiry") {
      reply =
        "For general inquiries, please contact the academic office or raise a ticket through portal.Admin office: +91-9876543210";
    } else if (type === "event") {
      reply =
        "For event related queries, please check the Events module or contact event coordinator.";
    } else if (type === "document") {
      reply =
        "For document collection, please contact Admin Office: 📞 +91-9876543210";
    }

    setMessages((prev) => [
      ...prev,
      { from: "user", text: type },
      { from: "bot", text: reply },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={styles.fab}
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div style={styles.chatBox}>
          <div style={styles.header}>Support Assistant</div>

          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.from === "bot" ? "left" : "right",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    background:
                      msg.from === "bot" ? "#f1f5f9" : "#111827",
                    color: msg.from === "bot" ? "#000" : "#fff",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    display: "inline-block",
                    maxWidth: "80%",
                    fontSize: "13px",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Options */}
          <div style={styles.options}>
            <button onClick={() => handleOption("inquiry")}>
              General Inquiry
            </button>
            <button onClick={() => handleOption("event")}>
              Event Query
            </button>
            <button onClick={() => handleOption("document")}>
              Document Collection
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    border: "none",
    background: "#111827",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
    zIndex: 999,
  },
  chatBox: {
    position: "fixed",
    bottom: "85px",
    right: "20px",
    width: "300px",
    height: "380px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 999,
  },
  header: {
    padding: "12px",
    background: "#111827",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  messages: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
    fontSize: "14px",
  },
  options: {
    borderTop: "1px solid #eee",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
};