"use client";

import api from "@/api/axios";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function SaveBtn({
  comp,
  isSaved,
  onToggle,
}: {
  comp: { _id: string; slug: string };
  isSaved: boolean;
  onToggle?: () => void;
}) {
  const [saved, setSaved] = useState(isSaved);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const checkSaved = async () => {
      try {
        const { data } = await api.get(`${backendURL}/api/users/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaved(data.savedComp?.some((c: any) => c._id === comp._id));
      } catch (err) {
        console.error("Check saved error:", err);
      }
    };
    checkSaved();
  }, [comp._id, backendURL]);

  const toggleSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (saved) {
        await api.delete(`${backendURL}/api/users/save/${comp.slug}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setSaved(false);
        toast.success("Successfully removed saved competition");
      } else {
        await api.post(
          `${backendURL}/api/users/save/${comp.slug}`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setSaved(true);
        toast.success("Successfully saved competition");
      }

      if (onToggle) onToggle();
    } catch (error) {
      console.error("Error saving/unsaving comp:", error);
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "Action failed. Please try again."
      );
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
