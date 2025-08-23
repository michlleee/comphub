"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import api from "@/api/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function RegisterForm() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await api.post(
          `${backendURL}/api/auth/register`,
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );

        localStorage.setItem("accessToken", data.accessToken);
        toast.success("Signup successful! Redirecting...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const errorMsg =
          error.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <>
      <div>
        <div className="max-w-sm mx-auto w-full">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-4 text-gray-200 hover:text-gray-400"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Sign up to CompHub
          </h2>

          <Button
            variant="outline"
            className="w-full bg-transparent"
            type="button"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center text-gray-300 text-sm mb-4 mt-5">
            <span className="flex-1 border-b border-gray-300"></span>
            <span className="px-2"> or </span>
            <span className="flex-1 border-b border-gray-300"></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1">Email*</Label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1">
                Password*
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Password should be at least 8 characters including a number and
                a lowercase letter.
              </p>
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1">
                Username*
              </Label>
              <Input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Username may only contain alphanumeric characters or single
                hyphens, and cannot begin or end with a hyphen.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary/80 hover:bg-primary/70 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Create account
            </Button>
          </form>
          <div className="mt-3 text-sm text-center text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
