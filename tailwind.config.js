export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",

        appBg: "var(--color-bg)",
        card: "var(--color-card)",

        textPrimary: "var(--color-textPrimary)",
        textSecondary: "var(--color-textSecondary)",

        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};