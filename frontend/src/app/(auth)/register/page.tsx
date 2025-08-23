import { RegisterForm } from "@/components/RegisForm";
import { Code } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-white relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-gray-900">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-2xl"></div>

        <div className="max-w-lg text-center relative z-10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5 shadow-lg">
          <h1 className="text-5xl font-bold mb-4 text-primary">
            Join the Competition Hub
          </h1>
          <p className="text-gray-300 mb-6 text-lg">
            Find, track, and stay updated on the latest CS competitions. Never
            miss a registration deadline again.
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>

        <div className="absolute bg-black p-2 rounded-full shadow-lg border border-white/10">
          <Code className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-6 bg-gradient-to-br from-black via-gray-950 to-gray-900">
        <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5 shadow-lg">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
