// Runs before React/styles so a saved or system dark theme is applied before paint.
(() => {
  let preference;
  try { preference = localStorage.getItem("stsms-theme"); } catch { /* Use the OS. */ }
  const theme = preference === "light" || preference === "dark" ? preference
    : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
})();
