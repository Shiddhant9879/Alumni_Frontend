# ALUMNI-FRONTEND

Frontend application for the **Alumni Management System**, built using modern web technologies to provide a clean, responsive, and role-based user experience.

This project is actively developed and integrated with a Spring Boot backend using JWT-based authentication.

---

## 🚀 Project Overview

The frontend connects with backend APIs to enable:

- 🔐 User authentication (Admin / Alumni / Faculty / Student)
- 👤 Alumni profile creation & update
- 📂 Alumni directory (DB-driven, searchable & filterable)
- 📅 Event viewing and registration
- 🛡️ Role-based UI rendering (Admin vs Non-Admin)
- 📰 College news & announcements (Admin-controlled, user-visible)
- 🔄 Secure API communication using JWT
- 📱 Responsive UI for desktop usage

---

## ✅ Implemented Features (Current Status)

### 🔑 Authentication & Authorization
- Login & registration flow
- JWT token storage and auto-attachment via Axios interceptor
- Role-based navigation and route protection

### 👤 Alumni Profile Builder
- Create and update alumni profile
- One-to-one mapping with logged-in user
- Data persisted in backend database

### 📂 Alumni Directory
- Directory populated **directly from AlumniProfile database**
- Paginated backend API using DTOs
- Client-side:
  - Search by name, skills, company, branch
  - Filter by passing year and program
- No hardcoded data

### 📅 Events Module
- Admin can create/post events
- Students / Alumni / Faculty can:
  - View events
  - Open event registration page
  - Register for events (DB stored)
- Clean separation between:
  - Event listing
  - Event registration flow

### 📰 Home Page (Role-Based)
- Students / Faculty / Alumni:
  - View college news & announcements
- Admin:
  - Redirect option to Admin Dashboard
- Static institutional leadership section

### 🛡️ Admin Dashboard
- Event posting
- Event management
- Future scope: announcement posting & analytics

---

## 🛠️ Tech Stack

- **Framework:** React (Vite)
- **Routing:** React Router DOM
- **API Communication:** Axios (with interceptors)
- **State Management:** React Hooks
- **Styling:** CSS / Component-based styling
- **Authentication:** JWT (via backend)

- src/
├── components/ # Navbar, SideDrawer, ProtectedRoute, etc.
├── pages/ # Home, Login, Profile, Directory, Events, AdminDashboard
├── api/ # Axios configuration
├── App.jsx # Route definitions
└── main.jsx # App bootstrap


---

## 🔧 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Shiddhant9879/ALUMNI-FRONTEND.git

# Go into project directory
cd ALUMNI-FRONTEND

# Install dependencies
npm install

# Start development server
npm run dev


---

## 📁 Folder Structure (Simplified)

