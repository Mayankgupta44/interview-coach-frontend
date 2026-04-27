/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#3B82F6",
        appBg: "#F9FAFB",
        card: "#FFFFFF",

        textPrimary: "#111827",
        textSecondary: "#6B7280",
        borderColor: "#E5E7EB",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(17, 24, 39, 0.06)",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};