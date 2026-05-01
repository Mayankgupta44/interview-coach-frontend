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
    <div
      className="
      rounded-xl 
      bg-[#0f172a]
      border border-white/10
      p-6 
      shadow-sm
      hover:shadow-blue-500/20 
      transition
    "
    >
      <div className="flex flex-col items-center text-center">
        <Avatar name={profile?.fullName} imageUrl={imageUrl} size="xl" />

        <h2 className="mt-4 text-lg font-semibold text-white">
          {profile?.fullName}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {profile?.targetRole || "No role set"}
        </p>

        {profile?.location && (
          <p className="mt-1 text-xs text-gray-400">📍 {profile.location}</p>
        )}
      </div>

      {profile?.bio && (
        <p className="mt-4 text-center text-sm text-gray-400">{profile.bio}</p>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {profile?.linkedInUrl && (
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
        )}

        {profile?.githubUrl && (
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            GitHub
          </a>
        )}

        {profile?.portfolioUrl && (
          <a
            href={profile.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            Portfolio
          </a>
        )}
      </div>
    </div>
  );
}
