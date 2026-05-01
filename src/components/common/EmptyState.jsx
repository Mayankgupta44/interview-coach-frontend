import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div
      className="
        rounded-xl 
        bg-[#0f172a]
        border border-white/10
        p-8 text-center 
        shadow-sm
        transition
        hover:shadow-blue-500/20
      "
    >
      <h3 className="text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="
            mt-5 inline-flex 
            rounded-xl 
            bg-gradient-to-r from-blue-600 to-blue-500 
            px-4 py-3 text-sm text-white 
            transition 
            hover:scale-105 
            hover:shadow-blue-500/30
          "
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}