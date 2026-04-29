import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="
        rounded-xl px-3 py-2 text-sm font-medium
        bg-card dark:bg-[rgba(15,23,42,0.7)]
        text-textPrimary dark:text-white
        shadow-soft dark:shadow-blue-500/20
        transition-all duration-200
        hover:scale-105 hover:shadow-blue-500/30
      "
    >
      {dark ? "☀" : "🌙"}
    </button>
  );
}