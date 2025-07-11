import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const u = document.querySelector('input[name="username"]')?.value;
    const p = document.querySelector('input[name="password"]')?.value;
    if (u) setUsername(u);
    if (p) setPassword(p);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-300 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-yellow-400">
          Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
          New user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline dark:text-yellow-400">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
