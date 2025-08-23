import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-950 to-gray-900">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Welcome Back to <span className="text-primary">CompHub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Sign in to access your account and stay updated on the latest CS
              competitions. Never miss a registration deadline again.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-muted-foreground">
                <span className="text-cyan-400">{"<>"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
