import { ArrowLeft, Code } from "lucide-react";
import Link from "next/link";
import { OrganizerLoginForm } from "@/components/OrganizerLoginForm";

export default function OrganizerLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-950 to-gray-900">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_auto_1fr] gap-20 items-center">
        <div className="w-full max-w-md mx-auto order-2 lg:order-1">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
          <OrganizerLoginForm />
        </div>

        <div className="relative flex items-center justify-center h-full order-3 lg:order-2">
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="relative bg-black p-2 rounded-full shadow-md border border-white/10">
            <Code className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        <div className="space-y-6 text-center lg:text-left order-1 lg:order-3">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Welcome Back to <span className="text-orange-500">CompHub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Sign in to manage your competitions and connect with thousands of
              developers. Continue building the future of competitive
              programming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
