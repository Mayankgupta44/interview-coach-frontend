import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ProfileCard from "../../components/profile/ProfileCard";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import { getMyProfile, updateMyProfile } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";
import { uploadProfileImage } from "../../services/profileImageService";

const experienceOptions = [
  { label: "Select experience level", value: "" },
  { label: "Fresher", value: "FRESHER" },
  { label: "Junior", value: "JUNIOR" },
  { label: "Mid Level", value: "MID_LEVEL" },
  { label: "Senior", value: "SENIOR" },
];

export default function ProfilePage() {
  const { updateCurrentUser } = useAuth();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    targetRole: "",
    experienceLevel: "",
    skills: "",
    location: "",
    profileImageUrl: "",
    linkedInUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setServerError("");

      const data = await getMyProfile();
      setProfile(data);

      setFormData({
        fullName: data.fullName || "",
        targetRole: data.targetRole || "",
        experienceLevel: data.experienceLevel || "",
        skills: data.skills?.join(", ") || "",
        location: data.location || "",
        profileImageUrl: data.profileImageUrl || "",
        linkedInUrl: data.linkedInUrl || "",
        githubUrl: data.githubUrl || "",
        portfolioUrl: data.portfolioUrl || "",
        bio: data.bio || "",
      });
    } catch (err) {
      setServerError(err?.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadProfileImage() {
    if (!profileImageFile) return;

    try {
      setUploadingImage(true);
      setServerError("");
      setSuccessMessage("");

      const data = await uploadProfileImage(profileImageFile);

      setFormData((prev) => ({
        ...prev,
        profileImageUrl: data.profileImageUrl,
      }));

      setProfile((prev) => ({
        ...prev,
        profileImageUrl: data.profileImageUrl,
      }));

      setSuccessMessage("Profile image uploaded successfully.");
      setProfileImageFile(null);
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Failed to upload profile image.",
      );
    } finally {
      setUploadingImage(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccessMessage("");
  }

  function validate() {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function buildPayload() {
    return {
      fullName: formData.fullName.trim(),
      targetRole: formData.targetRole.trim(),
      experienceLevel: formData.experienceLevel || null,
      skills: formData.skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      location: formData.location.trim(),
      profileImageUrl: formData.profileImageUrl.trim(),
      linkedInUrl: formData.linkedInUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      portfolioUrl: formData.portfolioUrl.trim(),
      bio: formData.bio.trim(),
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!validate()) return;

    try {
      setSaving(true);

      const updatedProfile = await updateMyProfile(buildPayload());

      setProfile(updatedProfile);
      updateCurrentUser(updatedProfile);
      setSuccessMessage("Profile updated successfully.");

      await loadProfile();
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-card p-6 shadow-soft">
          <h1 className="text-2xl font-bold text-textPrimary">Profile</h1>
          <p className="mt-2 text-sm text-textSecondary">
            Manage your personal details, role preference, skills, and social
            links.
          </p>
        </section>

        {serverError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
            {serverError}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-card p-6 shadow-soft">
            <p className="text-sm text-textSecondary">Loading profile...</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ProfileCard profile={profile || formData} />
            </div>

            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gray-200 bg-card p-6 shadow-soft"
              >
                <h2 className="text-lg font-semibold text-textPrimary">
                  Edit Profile
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                  />

                  <Input
                    label="Target Role"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleChange}
                  />

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-200"
                    >
                      {experienceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Profile Image
                    </label>

                    <div className="flex items-center gap-3">
                      {/* Hidden Input */}
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/png,image/jpeg,image/jpg"
                        className="hidden"
                        onChange={(e) =>
                          setProfileImageFile(e.target.files?.[0] || null)
                        }
                      />

                      {/* Custom Button */}
                      <label
                        htmlFor="profileImage"
                        className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition"
                      >
                        Choose File
                      </label>

                      {/* Selected File UI */}
                      {profileImageFile && (
                        <span className="text-sm px-3 py-1 rounded-md bg-primary/10 text-primary font-medium">
                          {profileImageFile.name}
                        </span>
                      )}
                    </div>

                    {/* Upload Button */}
                    <button
                      type="button"
                      onClick={handleUploadProfileImage}
                      disabled={!profileImageFile || uploadingImage}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {uploadingImage ? "Uploading..." : "Upload Image"}
                    </button>
                  </div>

                  <Input
                    label="LinkedIn URL"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                  />

                  <Input
                    label="GitHub URL"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                  />

                  <Input
                    label="Portfolio URL"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-5">
                  <Textarea
                    label="Skills"
                    name="skills"
                    rows={3}
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Java, Spring Boot, React, MongoDB"
                  />
                </div>

                <div className="mt-5">
                  <Textarea
                    label="Bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-6 max-w-xs">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>

                {successMessage ? (
                  <p className="mt-3 text-sm text-success">{successMessage}</p>
                ) : null}
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
