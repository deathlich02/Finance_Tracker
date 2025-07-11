import { useContext } from "react";
import { ThemeContext } from "../context/themeContext.jsx";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded hover:bg-zinc-700 transition"
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    >
      {theme === "light" ? (
        <FaMoon className="text-white" />
      ) : (
        <FaSun className="text-yellow-400" />
      )}
    </button>
  );
}
