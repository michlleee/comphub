import { ArrowLeft, Code } from "lucide-react";
import Link from "next/link";
import OrganizerSignupForm from "@/components/OrganizerSignupForm";

export default function OrganizerSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-8 py-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_auto_1fr] items-center gap-20">
        <div className="lg:col-span-1 space-y-6 text-white">
          <h1 className="text-5xl font-bold">
            Host Your Own <br />
            <span className="text-orange-400">Competition Hub</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md">
            Create, manage, and host programming competitions. Reach thousands
            of developers and build your community. Never miss an opportunity to
            showcase talent again.
          </p>
        </div>

        <div className="hidden lg:flex items-center justify-center relative h-96">
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          <div className="relative bg-black p-3 rounded-full shadow-lg border border-white/10">
            <Code className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        <div className="lg:col-span-1 w-full max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>

          <div className="p-8 rounded-2xl backdrop-blur-sm bg-white/5 shadow-lg">
            <OrganizerSignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
