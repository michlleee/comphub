"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/api/axios";
import { AxiosError } from "axios";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        `${backendURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", data.accessToken);

      toast.success("Login successful! Redirecting...");

      if (data.user.role === "admin") {
        router.push("/dashboard-admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <Card className="w-full bg-card border-border">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-4 text-gray-200 hover:text-gray-400"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-center">
            Sign in to CompHub
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* <Button
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password*</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Sign in
          </Button>
        </form>

        <div className="mt-3 text-sm text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign up →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
