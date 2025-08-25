"use client";

import api from "@/api/axios";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function SaveBtn({
  comp,
  isSaved,
  onToggle,
}: {
  comp: any;
  isSaved: boolean;
  onToggle?: () => void;
}) {
  const [saved, setSaved] = useState(isSaved);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const toggleSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (saved) {
        await api.delete(`${backendURL}/api/users/save/${comp.slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSaved(false);
        toast.success("Successfully removed saved competition");
      } else {
        await api.post(`${backendURL}/api/users/save/${comp.slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSaved(true);
        toast.success("Successfully save competition");
      }
      if (onToggle) onToggle();
    } catch (error) {
      console.error("Error saving/unsaving comp:", error);
      const err = error as AxiosError<{ message: string }>;
      const errorMsg =
        err.response?.data?.message || "Action failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <button
      onClick={toggleSave}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition ${
        saved
          ? "bg-sky-500/20 text-sky-400 hover:bg-sky-500/30"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      <Bookmark className={`h-5 w-5 ${saved ? "fill-sky-400" : ""}`} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
