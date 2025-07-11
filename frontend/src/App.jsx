import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Insights from "./pages/Insights.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { FaSignOutAlt } from "react-icons/fa";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function ProtectedLayout({ children }) {
  return (
    <>
      <nav className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="space-x-6">
          <Link to="/dashboard" className="font-semibold hover:text-gold transition">Dashboard</Link>
          <Link to="/insights" className="font-semibold hover:text-gold transition">Insights</Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            title="Logout"
            className="hover:text-red-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h6a1 1 0 010 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm11.707 5.293a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L12.586 10l-2.293-2.293a1 1 0 111.414-1.414l3 3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      <main className="bg-black min-h-screen">
        {children}
      </main>
    </>
  );
}


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? (
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/insights"
        element={
          isAuthenticated() ? (
            <ProtectedLayout>
              <Insights />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
