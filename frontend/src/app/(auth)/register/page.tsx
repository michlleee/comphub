import { RegisterForm } from "@/components/regis-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary/20 rounded-full blur-md"></div>

      {/* Additional floating circles */}
      <div className="absolute top-10 right-10 w-28 h-28 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-primary/15 rounded-full blur-lg animate-bounce"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.3)_1px,_transparent_0)] bg-[size:20px_20px]"></div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-gradient-to-l from-primary/15 to-transparent rounded-full blur-xl"></div>
      <div className="absolute top-1 right-1 w-30 h-30 bg-gradient-to-r from-primary/40 to-transparent rounded-full blur-2xl animate-pulse"></div>

      {/* More gradient orbs */}
      <div className="absolute top-2/3 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/15 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/2 right-1/5 w-28 h-28 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-xl animate-bounce"></div>

      <div className="w-full max-w-md relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
