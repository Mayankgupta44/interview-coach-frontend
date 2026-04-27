import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-textPrimary">404</h1>
      <p className="mt-2 text-textSecondary">Page not found</p>
      <Link to="/" className="mt-4 text-sm font-medium text-textPrimary underline">
        Go home
      </Link>
    </div>
  );
}