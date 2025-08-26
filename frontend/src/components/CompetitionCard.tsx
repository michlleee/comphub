import Link from "next/link";
import { Calendar, MapPin, Tag } from "lucide-react";

type Competition = {
  title: string;
  topic: string;
  slug: string;
  category: string;
  shortDesc?: string;
  location: string;
  registrationOpen: Date;
  registrationClose: Date;
};

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isRegistrationOpen = () => {
    const now = new Date();
    const openDate = new Date(competition.registrationOpen);
    const closeDate = new Date(competition.registrationClose);
    return now >= openDate && now <= closeDate;
  };

  const getRegistrationStatus = () => {
    const now = new Date();
    const openDate = new Date(competition.registrationOpen);
    const closeDate = new Date(competition.registrationClose);

    if (now < openDate) return { status: "upcoming", text: "Opens Soon" };
    if (now > closeDate) return { status: "closed", text: "Closed" };
    return { status: "open", text: "Open Now" };
  };

  const registrationStatus = getRegistrationStatus();

  return (
    <Link
      href={`/competitions/${competition.category.toLowerCase()}/${
        competition.slug
      }`}
      className="group"
    >
      <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-sm font-medium">
            {competition.category}
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              registrationStatus.status === "open"
                ? "bg-green-500/10 text-green-400"
                : registrationStatus.status === "upcoming"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {registrationStatus.text}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-400 transition-colors">
          {competition.title}
        </h3>

        {competition.topic && (
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} className="text-slate-400" />
            <span className="text-slate-300 text-sm">{competition.topic}</span>
          </div>
        )}

        {competition.shortDesc && (
          <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
            {competition.shortDesc}
          </p>
        )}

        <div className="space-y-3 mt-auto">
          {competition.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-400" />
              <span className="text-slate-300 text-sm">
                {competition.location}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-slate-300 text-sm">
              Registration: {formatDate(competition.registrationOpen)} -{" "}
              {formatDate(competition.registrationClose)}
            </span>
          </div>

          <div className="flex items-center text-teal-400 text-sm font-medium pt-2">
            View Details
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
