import { useSyncExternalStore } from "react";

const KEY = "stsms-theme";
const EVENT = "stsms-theme-change";
const validTheme = value => value === "light" || value === "dark";

function readPreference() {
  try { const value = localStorage.getItem(KEY); return validTheme(value) ? value : null; }
  catch { return null; }
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function subscribe(listener) {
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (!readPreference()) { applyTheme(system.matches ? "dark" : "light"); listener(); }
  };
  const onStorage = event => {
    if (event.key === KEY || event.key === null) {
      applyTheme(readPreference() ?? (system.matches ? "dark" : "light"));
      listener();
    }
  };
  window.addEventListener(EVENT, listener);
  window.addEventListener("storage", onStorage);
  system.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener("storage", onStorage);
    system.removeEventListener("change", onSystemChange);
  };
}

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe,
    () => document.documentElement.classList.contains("dark") ? "dark" : "light");
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(KEY, next); } catch { /* Keep the in-memory choice. */ }
    window.dispatchEvent(new Event(EVENT));
  }
  return { theme, toggleTheme };
}
