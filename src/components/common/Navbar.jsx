import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-primary/10 text-primary dark:text-blue-400 dark:shadow-blue-500/20"
        : "text-textSecondary hover:bg-appBg hover:text-textPrimary"
    }`;

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  function getProfileImageUrl(profileImageUrl) {
    if (!profileImageUrl) return "";

    if (profileImageUrl.startsWith("http")) {
      return profileImageUrl;
    }

    return `${API_BASE_URL.replace("/api", "")}${profileImageUrl}`;
  }

  return (
    <header
      className="sticky top-0 z-40 
      bg-card/80 dark:bg-[#020617]
      backdrop-blur-lg 
      border-b border-gray-200 dark:border-white/10 
      shadow-sm dark:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
              IC
            </div>
            <span className="hidden text-lg font-bold text-textPrimary sm:block">
              Interview Coach
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={navClass}>
              Profile
            </NavLink>
            <NavLink to="/documents" className={navClass}>
              Resume & JD
            </NavLink>
            <NavLink to="/skill-gap" className={navClass}>
              Skill Gap
            </NavLink>
            <NavLink to="/interviews" className={navClass}>
              Interviews
            </NavLink>
          </nav>
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 
                transition-all duration-200 
                hover:bg-appBg dark:hover:bg-white/10 
                hover:shadow-blue-500/20"
            >
              <Avatar
                name={user?.fullName}
                imageUrl={getProfileImageUrl(user?.profileImageUrl)}
              />

              <div className="hidden text-left sm:block">
                <p className="max-w-32 truncate text-sm font-semibold text-textPrimary">
                  {user?.fullName || "User"}
                </p>
                <p className="max-w-32 truncate text-xs text-textSecondary">
                  {user?.targetRole || "Interview Prep"}
                </p>
              </div>

              <span className="text-xs text-textSecondary">▾</span>
            </button>
          </div>

          {open && (
            <div
              className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl 
              bg-card dark:bg-[rgba(15,23,42,0.7)] 
              shadow-soft dark:shadow-blue-500/10"
            >
              <div className="px-4 py-3">
                <p className="truncate text-sm font-semibold text-textPrimary">
                  {user?.fullName || "User"}
                </p>
                <p className="truncate text-xs text-textSecondary">
                  {user?.email}
                </p>
              </div>

              <div className="p-2">
                <DropdownLink to="/" label="Dashboard" setOpen={setOpen} />
                <DropdownLink to="/profile" label="Profile" setOpen={setOpen} />
                <DropdownLink
                  to="/documents"
                  label="Resume & JD"
                  setOpen={setOpen}
                />
                <DropdownLink
                  to="/interviews"
                  label="Interviews"
                  setOpen={setOpen}
                />

                <button
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-danger transition-all duration-200 hover:bg-danger/10"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-4 py-2 lg:hidden">
        <NavLink to="/" className={navClass}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" className={navClass}>
          Profile
        </NavLink>
        <NavLink to="/documents" className={navClass}>
          Resume
        </NavLink>
        <NavLink to="/skill-gap" className={navClass}>
          Skill Gap
        </NavLink>
        <NavLink to="/interviews" className={navClass}>
          Interviews
        </NavLink>
      </nav>
    </header>
  );
}

function DropdownLink({ to, label, setOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="block rounded-lg px-3 py-2 text-sm font-medium 
        text-textSecondary transition-all duration-200 
        hover:bg-appBg dark:hover:bg-white/10 
        hover:text-textPrimary"
    >
      {label}
    </Link>
  );
}
