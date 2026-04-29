import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div
      className="rounded-xl bg-appBg dark:bg-white/5 backdrop-blur-md 
        p-8 text-center 
        shadow-soft dark:shadow-blue-500/10 
        hover:shadow-blue-500/20 transition"
    >
      <h3 className="text-base font-semibold text-textPrimary dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-textSecondary dark:text-gray-300">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="mt-5 inline-flex rounded-xl 
            bg-gradient-to-r from-blue-600 to-blue-400 
            px-4 py-3 text-sm text-white 
            hover:shadow-blue-500/40 hover:scale-105 
            transition"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
