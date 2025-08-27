import { Megaphone, Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function OrganizerSection() {
  return (
    <>
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30">
              For Competition Organizers
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">
              Add Your <span className="text-orange-400">Competition</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Want more people to discover your competition? Submit it to our
              platform and get promoted to a community of developers, students,
              and professionals looking for their next challenge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-white">
                  Reach More Participants
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Get your competition in front of thousands of developers,
                  students, and professionals actively searching for events to
                  join.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Megaphone className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-white">Promote Your Event</CardTitle>
                <CardDescription className="text-slate-300">
                  Listing is simple—just add your competition details, and our
                  platform helps highlight and promote it to the right audience.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-600 px-12 py-4 text-lg"
            >
              <Link href="/organizer-signup">Submit Your Competition</Link>
            </Button>
            <p className="text-sm text-slate-400 mt-4">
              Already submitted a competition?{" "}
              <Link
                href="/organizer-login"
                className="text-orange-400 hover:text-orange-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
