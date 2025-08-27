"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Organizer } from "./PendingOrganizers";
import api from "@/api/axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface OrganizerCardProps {
  organizer: Organizer;
  refresh: () => void;
}

export function OrganizerCard({ organizer, refresh }: OrganizerCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const result = await api.patch(
        `${backendURL}/api/admin/organizers/${organizer._id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success(result.data.message);
      refresh();
    } catch (error: any) {
      console.error(
        "Error approving organizer:",
        error.response?.data || error.message
      );
      toast.error("Error approving organizer");
    }

    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const result = await api.patch(
        `${backendURL}/api/admin/organizers/${organizer._id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success(result.data.message);
      refresh();
    } catch (error: any) {
      console.error(
        "Error rejecting organizer:",
        error.response?.data || error.message
      );
      toast.error("Error rejecting organizer");
    }
    setIsProcessing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {organizer.username}
            </h3>
            <p className="text-blue-400 font-medium">
              {organizer.organizationName || "—"}
            </p>
            <p className="text-sm text-gray-400">{organizer.email}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Submitted {formatDate(organizer.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Contact: {organizer.contactInfo || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[140px]">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {isProcessing ? "Processing..." : "Approve"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Approve Organizer</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to approve{" "}
                  <span className="font-medium text-white">
                    {organizer.username}
                  </span>
                  ? This will grant them organizer access.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleApprove()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Reject Button with AlertDialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={isProcessing}
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white flex items-center gap-2 bg-transparent"
              >
                <XCircle className="w-4 h-4" />
                {isProcessing ? "Processing..." : "Reject"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reject Organizer</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to reject{" "}
                  <span className="font-medium text-white">
                    {organizer.username}
                  </span>
                  ? They will not be able to submit competitions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleReject()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
