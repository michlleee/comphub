"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Trophy,
  Edit,
  Eye,
  Inbox,
  Globe,
} from "lucide-react";
import type { Competition } from "./OrganizerContainer";
import { useRouter } from "next/navigation";

interface HostedCompetitionProps {
  loading: boolean;
  competitions: Competition[];
}

export function HostedCompetition({
  loading,
  competitions,
}: HostedCompetitionProps) {
  const router = useRouter();

  const getRegistrationStatus = (competition: Competition) => {
    const now = new Date();
    const openDate = new Date(competition.registrationOpen);
    const closeDate = new Date(competition.registrationClose);

    if (now < openDate) return { status: "upcoming", text: "Opens Soon" };
    if (now > closeDate) return { status: "completed", text: "Closed" };
    return { status: "active", text: "Open Now" };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "upcoming":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleEdit = () => {
    console.log("edit bro");
  };

  if (loading) {
    return <p className="text-gray-400 text-center">Loading competitions...</p>;
  }

  if (competitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
        <Inbox className="w-12 h-12 text-gray-500" />
        <p className="text-lg font-semibold">No competitions found</p>
        <p className="text-sm text-gray-500">
          You haven't added any competitions yet. Fill in the "Add New
          Competition" form to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {competitions.map((competition) => {
        const regStatus = getRegistrationStatus(competition);

        return (
          <Card key={competition._id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg">
                    {competition.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    {competition.shortDesc}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(regStatus.status)}>
                  {regStatus.text}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Trophy className="h-4 w-4" />
                  <span>{competition.prize ?? "TBD"}</span>
                </div>
                {competition.eventDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(competition.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {competition.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{competition.location}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={() =>
                    window.open(competition.registrationLink, "_blank")
                  }
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Competition Link
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-400 text-orange-400 hover:bg-orange-400/10 bg-transparent"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400/10 bg-transparent"
                  onClick={() =>
                    router.push(
                      `/competitions/${competition.category?.toLowerCase()}/${
                        competition.slug
                      }`
                    )
                  }
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
