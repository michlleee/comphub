"use client";

import { useEffect, useState } from "react";
import { OrganizerCard } from "./OrganizerCard";
import api from "@/api/axios";

export type Organizer = {
  _id: string;
  username: string;
  email: string;
  role: string;
  organizationName: string;
  contactInfo: string;
  status: string;
  createdAt: string;
};

export function PendingOrganizers() {
  const [orgData, setOrgData] = useState<Organizer[]>([]);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchOrganizers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const allOrganizers = await api.get(
        `${backendURL}/api/admin/organizers/pending`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setOrgData(allOrganizers.data.organizers);
    } catch (error: any) {
      console.error(
        "Error fetching organizers:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  return (
    <div className="space-y-4">
      {orgData.length === 0 ? (
        <div className="text-center py-12 bg-gray-900/30 border border-gray-800 rounded-lg">
          <p className="text-gray-400">
            No pending applications at the moment.
          </p>
        </div>
      ) : (
        orgData.map((organizer) => (
          <OrganizerCard
            key={organizer._id}
            organizer={organizer}
            refresh={fetchOrganizers}
          />
        ))
      )}
    </div>
  );
}
