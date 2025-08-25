"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
import SavedComps from "./SavedComps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Trophy, Calendar } from "lucide-react";

export function ProfileSection() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    savedCompetitions: [],
  });

  const fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await api.get(`${backendURL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserData((prev) => ({
        ...prev,
        ...data.user,
      }));
      return data.user;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      return null;
    }
  };

  const fetchSavedComp = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const savedComp = await api.get(`${backendURL}/api/users/saved`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserData((prev) => ({
        ...prev,
        savedCompetitions: savedComp.data.savedComp,
      }));
    } catch (error) {
      console.error("Failed to fetch savedComp:", error);
    }
  };

  useEffect(() => {
    const loadProfileAndSaved = async () => {
      const user = await fetchUserProfile();
      if (user) {
        await fetchSavedComp();
      }
    };

    loadProfileAndSaved();
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="relative p-8">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 border-2 border-primary/30">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">
                Welcome back, {userData.username || "User"}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-400">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Saved Competitions
            </CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {userData.savedCompetitions.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Active Status
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">Online</div>
          </CardContent>
        </Card>
      </div>

      <SavedComps />
    </div>
  );
}
