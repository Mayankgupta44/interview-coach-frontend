import Avatar from "../ui/Avatar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function getProfileImageUrl(profileImageUrl) {
  if (!profileImageUrl) return "";

  if (profileImageUrl.startsWith("http")) {
    return profileImageUrl;
  }

  return `${API_BASE_URL.replace("/api", "")}${profileImageUrl}`;
}

export default function ProfileCard({ profile }) {
  const imageUrl = getProfileImageUrl(profile?.profileImageUrl);

  return (
    <div className="rounded-xl 
    bg-white
    dark:bg-[rgba(15,23,42,0.7)] 
    p-6 
    shadow-soft dark:shadow-blue-500/10 
    border border-gray-200
    hover:shadow-blue-500/20 transition">
      <div className="flex flex-col items-center text-center">
        <Avatar
          name={profile?.fullName}
          imageUrl={imageUrl}
          size="xl"
        />

        <h2 className="mt-4 text-lg font-semibold text-textPrimary dark:text-white">
          {profile?.fullName}
        </h2>

        <p className="mt-1 text-sm text-textSecondary dark:text-gray-300">
          {profile?.targetRole || "No role set"}
        </p>

        {profile?.location && (
          <p className="mt-1 text-xs text-textSecondary dark:text-gray-300">
            📍 {profile.location}
          </p>
        )}
      </div>

      {profile?.bio && (
        <p className="mt-4 text-center text-sm text-textSecondary dark:text-gray-300">
          {profile.bio}
        </p>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {profile?.linkedInUrl && (
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary hover:underline dark:text-blue-400"
          >
            LinkedIn
          </a>
        )}

        {profile?.githubUrl && (
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary hover:underline dark:text-blue-400"
          >
            GitHub
          </a>
        )}

        {profile?.portfolioUrl && (
          <a
            href={profile.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary hover:underline dark:text-blue-400"
          >
            Portfolio
          </a>
        )}
      </div>
    </div>
  );
}