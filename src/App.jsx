import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Directory from "./pages/Directory";
import Events from "./pages/Events";
import EventRegister from "./pages/EventRegister";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SideDrawer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

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
      </Routes>
    </BrowserRouter>
  );
}
