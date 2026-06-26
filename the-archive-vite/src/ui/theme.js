export function applyTheme(theme) {
  const root = document.documentElement;

  root.style.setProperty("--bg", theme.background);
  root.style.setProperty("--panel", theme.panel);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--accent", theme.accent);
}