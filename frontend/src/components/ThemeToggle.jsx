import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button type="button" className={`icon-button theme-toggle ${className}`}
      onClick={toggleTheme} aria-label={label} title={label} aria-pressed={theme === "dark"}>
      <Icon size={19} strokeWidth={1.65} aria-hidden="true" />
    </button>
  );
}
