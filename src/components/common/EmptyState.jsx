export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="rounded-xl bg-appBg p-8 text-center">
      <h3 className="text-base font-semibold text-textPrimary">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-textSecondary">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="mt-5 inline-flex rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-secondary"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}