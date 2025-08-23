import { LoginForm } from "@/components/LoginForm";
import { Code } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in - CompHub",
  description:
    "Sign in to access your CompHub account and stay updated on the latest CS competitions. Never miss a registration deadline again.",
  openGraph: {
    title: "Sign in - CompHub",
    description:
      "Sign in to access your CompHub account and stay updated on the latest CS competitions.",
    url: "http://localhost:3000/login",
    siteName: "CompHub",
    images: [
      {
        url: "http://localhost:3000/login/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign in - CompHub",
    description:
      "Sign in to access your CompHub account and stay updated on the latest CS competitions.",
    images: ["http://localhost:3000/login/og-image.png"],
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-950 to-gray-900">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_auto_1fr] gap-20 items-center">
        <div className="w-full max-w-md mx-auto order-2 lg:order-1">
          <LoginForm />
        </div>

        <div className="relative flex items-center justify-center h-full order-3 lg:order-2">
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="relative bg-black p-2 rounded-full shadow-md border border-white/10">
            <Code className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-6 text-center lg:text-left order-1 lg:order-3">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Welcome Back to <span className="text-primary">CompHub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Sign in to access your account and stay updated on the latest CS
              competitions. Never miss a registration deadline again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
