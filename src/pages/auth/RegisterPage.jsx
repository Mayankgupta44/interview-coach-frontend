import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      await register(formData);
      navigate("/");
    } catch (error) {
      setServerError(
        error?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start preparing for interviews with AI guidance"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          error={errors.fullName}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
        />

        {serverError ? (
          <p className="text-sm text-danger">{serverError}</p>
        ) : null}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-textSecondary">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}