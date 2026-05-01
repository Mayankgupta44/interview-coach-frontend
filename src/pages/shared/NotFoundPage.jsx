import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center 
    bg-[#020617] px-4 text-center">

      <h1 className="text-5xl font-bold text-blue-400">404</h1>

      <p className="mt-3 text-gray-400">Page not found</p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl 
        bg-blue-500/20 
        px-5 py-3 text-sm font-medium text-blue-400 
        transition-all duration-200 
        hover:bg-blue-500/30"
      >
        Go back home
      </Link>
    </div>
  );
}