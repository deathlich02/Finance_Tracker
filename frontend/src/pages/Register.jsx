import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { username, email, password });
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      alert(err.response.data.message)
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-300 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-yellow-400">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline dark:text-yellow-400">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
