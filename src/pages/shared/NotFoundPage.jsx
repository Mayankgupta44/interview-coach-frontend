import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center 
    bg-appBg px-4 text-center">
      <h1 className="text-5xl font-bold text-primary">404</h1>

      <p className="mt-3 text-textSecondary">Page not found</p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-secondary"
      >
        Go back home
      </Link>
    </div>
  );
}
