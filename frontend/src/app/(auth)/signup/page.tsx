import { RegisterForm } from "@/components/RegisForm";
import { Code } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up - CompHub",
  description:
    "Sign up to access your CompHub account and stay updated on the latest CS competitions. Never miss a registration deadline again.",
  openGraph: {
    title: "Sign up - CompHub",
    description:
      "Sign up to access your CompHub account and stay updated on the latest CS competitions.",
    url: "http://localhost:3000/signup",
    siteName: "CompHub",
    images: [
      {
        url: "http://localhost:3000/signup/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign up - CompHub",
    description:
      "Sign up to access your CompHub account and stay updated on the latest CS competitions.",
    images: ["http://localhost:3000/signup/og-image.png"],
  },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-gray-900 px-8 py-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_auto_1fr] items-center gap-20">
        <div className="lg:col-span-1 text-center lg:text-left space-y-6 text-white">
          <h1 className="text-5xl font-bold text-primary">
            <span>Join the</span> <br />
            <span>Competition Hub</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto lg:mx-0">
            Find, track, and stay updated on the latest CS competitions. Never
            miss a registration deadline again.
          </p>
        </div>

        <div className="hidden lg:flex items-center justify-center relative h-96">
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="relative bg-black p-3 rounded-full shadow-lg border border-white/10">
            <Code className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="lg:col-span-1 w-full max-w-md mx-auto">
          <div className="p-8 rounded-2xl backdrop-blur-sm bg-white/5 shadow-lg">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
