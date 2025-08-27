import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-800">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Clock className="w-16 h-16 text-orange-500" />
              <div className="absolute -top-1 -right-1">
                <CheckCircle className="w-6 h-6 text-orange-500 bg-gray-900 rounded-full" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            Verification in Progress
          </h1>

          <p className="text-gray-400 mb-2">
            Your organizer application is being processed.
          </p>
          <p className="text-gray-400 mb-8">
            We'll notify you once your account has been verified.
          </p>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center text-orange-500">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium">Awaiting Verification</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              <Link href="/">Return to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Link href="/organizer-login">Sign In</Link>
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Verification typically takes 1-2 business days
          </p>
        </div>
      </div>
    </div>
  );
}
