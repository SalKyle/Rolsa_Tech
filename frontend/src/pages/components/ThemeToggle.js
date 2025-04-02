import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="icon-button" onClick={toggleTheme} title="Toggle Theme">
      {theme === "dark" ? <Sun size={22} strokeWidth={2} /> : <Moon size={22} strokeWidth={2} />}
    </button>
  );
};

export default ThemeToggle;
