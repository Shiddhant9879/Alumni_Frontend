import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";

// public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword"; // 🔐 added

// protected pages
import Profile from "./pages/Profile";
import Directory from "./pages/Directory";
import Events from "./pages/Events";
import EventRegister from "./pages/EventRegister";
import AdminDashboard from "./pages/AdminDashboard";

// chatbot
import SupportChatbot from "./components/SupportChatbot";

// auth
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <BrowserRouter>
      <Navbar />
      <SideDrawer />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} /> {/* 🔐 added */}

        {/* ============== ALL LOGGED USERS ============== */}
        <Route
          path="/directory"
          element={
            <ProtectedRoute>
              <Directory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/register/:eventId"
          element={
            <ProtectedRoute>
              <EventRegister />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ONLY ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Chatbot only for non-admin users */}
      {token && user.role !== "ADMIN" && <SupportChatbot />}
    </BrowserRouter>
  );
}