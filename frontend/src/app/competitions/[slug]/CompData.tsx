"use client";
import {
  Calendar,
  LinkIcon,
  Trophy,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Users,
} from "lucide-react";
import api from "@/api/axios";
import { useEffect, useState } from "react";

type Competition = {
  title: string;
  shortDesc: string;
  description: string;
  category: string;
  topic: string;
  registrationOpen: string;
  registrationClose: string;
  eventDate: string;
  registrationLink: string;
  organizer: string;
  prize: string;
  location: string;
};

export default function CompData({ slug }: { slug: string }) {
  const [competition, setCompetition] = useState<Competition | null>(null);

  async function getCompetition(slug: string) {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await api.get(`${backendURL}/api/competition/${slug}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data.competition;
    } catch (error) {
      console.error("Failed to fetch competition:", error);
      return null;
    }
  }

  useEffect(() => {
    getCompetition(slug).then(setCompetition);
  }, [slug]);

  if (!competition) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-xl font-bold text-white">
            Loading competition details...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              {competition.category}
            </div>
            <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
              {competition.topic}
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Event Date:{" "}
                {new Date(competition.eventDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {competition.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mb-4">
            {competition.description}
          </p>
          <div className="flex items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Organized by {competition.organizer}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{competition.location}</span>
            </div>
          </div>
          <div className="mt-8">
            <a
              href={competition.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <LinkIcon className="w-5 h-5" />
              Register Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Competition Overview */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Competition Overview
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>{competition.shortDesc}</p>
                <p>{competition.description}</p>
              </div>
            </div>

            {/* Rules & Guidelines */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Event Information
              </h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Category:</strong> {competition.category}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Topic:</strong> {competition.topic}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Organizer:</strong> {competition.organizer}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Location:</strong> {competition.location}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Prize Pool:</strong> {competition.prize}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-400" />
                Event Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-green-400">
                      Registration Opens
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(
                        competition.registrationOpen
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-yellow-400">
                      Registration Closes
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(
                        competition.registrationClose
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-semibold text-primary">Event Date</p>
                    <p className="text-sm text-gray-400">
                      {new Date(competition.eventDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4">Quick Info</h3>
              <div className="grid grid-cols-2 gap-y-3">
                <span className="text-gray-400">Category</span>
                <span className="font-semibold break-words">
                  {competition.category}
                </span>

                <span className="text-gray-400">Topic</span>
                <span className="font-semibold break-words">
                  {competition.topic}
                </span>

                <span className="text-gray-400">Location</span>
                <span className="font-semibold break-words">
                  {competition.location}
                </span>

                <span className="text-gray-400">Organizer</span>
                <span className="font-semibold break-words">
                  {competition.organizer}
                </span>
              </div>
            </div>

            {/* Prizes */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Prize Information
              </h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {competition.prize}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Check registration link for detailed prize breakdown
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                Event Details
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Registration Opens:</span>
                  <span>
                    {new Date(
                      competition.registrationOpen
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Registration Closes:</span>
                  <span>
                    {new Date(
                      competition.registrationClose
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Event Date:</span>
                  <span>
                    {new Date(competition.eventDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <a
                    href={competition.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm underline"
                  >
                    View Full Details & Register →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
