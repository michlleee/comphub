import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Trophy, Bookmark, Calendar } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <Image
              src="/comphubLogo.svg"
              alt="CompHub logo"
              width={150}
              height={150}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Button
              asChild
              variant="ghost"
              className="text-foreground hover:text-primary"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900/50" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-teal-500/20 text-teal-400 border-teal-500/30">
            New Competitions Added Weekly
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-teal-300 to-white bg-clip-text text-transparent">
            Join the Challenge.
            <br />
            <span className="text-teal-400">Compete, Learn, Innovate.</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore the latest programming competitions, hackathons, and more.
            Save your favorites, track deadlines, and level up your skills with
            CompHub.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-teal-500 text-white hover:bg-teal-600 px-8 py-3"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Find Competitions
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Why <span className="text-teal-400">CompHub?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              All the competitions you care about, in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-teal-400" />
                </div>
                <CardTitle className="text-white">
                  Browse Competitions
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Discover the latest CS competitions with detailed info.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Bookmark className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">
                  Save Your Favorites
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Bookmark competitions and keep them all in one list.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-teal-400" />
                </div>
                <CardTitle className="text-white">Track Deadlines</CardTitle>
                <CardDescription className="text-slate-300">
                  Stay updated on registration open/close dates with ease.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your{" "}
            <span className="text-teal-400">Competitive Journey</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already improving their skills
            and building amazing projects
          </p>
          <Button
            size="lg"
            className="bg-teal-500 text-white hover:bg-teal-600 px-12 py-4 text-lg"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
