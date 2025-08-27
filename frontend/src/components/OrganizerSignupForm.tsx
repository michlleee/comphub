"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import api from "@/api/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function OrganizerSignupForm() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    organizationName: "",
    contactInfo: "",
    role: "organizer",
  });
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        `${backendURL}/api/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          organizationName: formData.organizationName,
          contactInfo: formData.contactInfo,
        },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Signup successful! Redirecting...");

      if (data.user.verified) {
        router.push("/dashboard-organizer");
      } else {
        router.push("/verification");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMsg =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Sign up as Organizer
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-white mb-2 block">
            Email*
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white mb-2 block">
            Password*
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Password should be at least 8 characters including a number and a
            lowercase letter.
          </p>
        </div>

        <div>
          <Label htmlFor="username" className="text-white mb-2 block">
            Username*
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Username may only contain alphanumeric characters or single hyphens,
            and cannot begin or end with a hyphen.
          </p>
        </div>

        <div>
          <Label htmlFor="organizationName" className="text-white mb-2 block">
            Organization Name*
          </Label>
          <Input
            id="organizationName"
            name="organizationName"
            type="text"
            placeholder="Your organization or company name"
            value={formData.organizationName}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <Label htmlFor="contactInfo" className="text-white mb-2 block">
            Contact Information*
          </Label>
          <Input
            id="contactInfo"
            name="contactInfo"
            type="tel"
            placeholder="Your contact info/phone number"
            value={formData.contactInfo}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400"
            pattern="^\+?[0-9\s\-]{7,15}$"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 mt-6"
        >
          Create organizer account
        </Button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        Already have an account?{" "}
        <Link
          href="/organizer-login"
          className="text-orange-400 hover:text-orange-300"
        >
          Sign in →
        </Link>
      </p>
    </div>
  );
}
