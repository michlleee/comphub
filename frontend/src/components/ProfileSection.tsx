"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
    <>
      <div>
        <h1>Welcome back {userData.username}</h1>

        {userData.savedCompetitions.length === 0 ? (
          <h1>You have no saved competitions :c</h1>
        ) : (
          <div>
            <h2>Your saved competitions</h2>
            <ul className="space-y-2">
              {userData.savedCompetitions.map((comp: any, idx: number) => (
                <li
                  key={comp?._id ?? `temp-${idx}`}
                  className="p-3 border rounded-md shadow-sm hover:bg-gray-900"
                >
                  <h3 className="font-semibold">{comp?.title}</h3>
                  <p>
                    Deadline:{" "}
                    {comp?.deadline
                      ? new Date(comp.deadline).toLocaleDateString()
                      : "TBD"}
                  </p>
                  {comp?.slug && (
                    <a
                      href={`/competitions/${comp.slug}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Competition
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
