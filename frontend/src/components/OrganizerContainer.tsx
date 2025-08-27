"use client";

import { Plus, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCompetitionForm } from "@/components/CreateCompetitionForm";
import { HostedCompetition } from "@/components/HostedCompetition";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import { FloatingActionMenuOrganizer } from "./FloatingActionMenuOrganizer";
export type Competition = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  description?: string;
  category?: string;
  topic?: string;
  registrationOpen: string;
  registrationClose: string;
  registrationLink: string;
  eventDate?: string;
  organizer?: string;
  prize?: string;
  location?: string;
};

export function OrganizerContainer() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [totalSaved, setTotalSaved] = useState(0);

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await api.get(`${backendURL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setName(data.user.username);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCompetitions = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await api.get(`${backendURL}/api/competition/mine`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCompetitions(data.competitionList || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalSaves = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await api.get(`${backendURL}/api/competition/saves`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTotalSaved(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCompetitions();
    fetchUserData();
    fetchTotalSaves();
  }, []);

  return (
    <>
      <FloatingActionMenuOrganizer />
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Organizer Dashboard
              </h1>
              <p className="text-gray-400 mt-1">
                Manage your competitions and events
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Welcome back,</p>
                <p className="font-semibold text-orange-400">{name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Competitions Submitted
              </CardTitle>
              <Trophy className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {competitions.length}
              </div>
              <p className="text-xs text-gray-500">Listed on the platform</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Saves by Users
              </CardTitle>
              <Users className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalSaved}</div>
              <p className="text-xs text-gray-500">
                Users saved your competitions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Plus className="h-5 w-5 text-orange-400" />
              <h2 className="text-xl font-semibold text-white">
                Add New Competition
              </h2>
            </div>
            <CreateCompetitionForm refresh={fetchAllCompetitions} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              My Competitions
            </h2>
            <HostedCompetition loading={loading} competitions={competitions} />
          </div>
        </div>
      </div>
    </>
  );
}
