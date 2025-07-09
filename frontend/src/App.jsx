import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Insights from "./pages/Insights.jsx";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <div>
      {/* Temporary Navbar */}
      {isAuthenticated() && (
        <nav style={{ padding: "10px", background: "#f2f2f2", marginBottom: "20px" }}>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
          <Link to="/insights">Insights</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/insights" element={isAuthenticated() ? <Insights /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
