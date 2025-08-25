"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CalendarX, ExternalLink, Bookmark } from "lucide-react";
import SaveBtn from "@/components/SaveBtn";

export default function SavedComps() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [savedComps, setSavedComps] = useState([]);

  const fetchSavedComp = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await api.get(`${backendURL}/api/users/saved`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSavedComps(data.savedComp || []);
    } catch (error) {
      console.error("Failed to fetch savedComp:", error);
    }
  };

  useEffect(() => {
    const loadProfileAndSaved = async () => {
      await fetchSavedComp();
    };

    loadProfileAndSaved();
  }, []);
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Bookmark className="h-5 w-5 text-primary" />
          Your Saved Competitions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {savedComps.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center">
                <Bookmark className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No saved competitions yet
            </h3>
            <p className="text-gray-500">
              Start exploring and save competitions that interest you!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedComps.map((comp: any, idx: number) => (
              <Card
                key={comp?._id ?? `temp-${idx}`}
                className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <h3 className="font-semibold text-white text-lg">
                        {comp?.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-2 text-gray-400">
                          <CalendarCheck className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Opens:{" "}
                            {comp?.regisOpen
                              ? new Date(comp.regisOpen).toLocaleDateString()
                              : "TBD"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <CalendarX className="h-4 w-4 text-red-500" />
                          <span className="text-sm">
                            Closes:{" "}
                            {comp?.regisClose
                              ? new Date(comp.regisClose).toLocaleDateString()
                              : "TBD"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <SaveBtn
                        comp={comp}
                        isSaved={true}
                        onToggle={fetchSavedComp}
                      />
                      {comp?.slug && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                        >
                          <a
                            href={`/competitions/${comp.category.toLowerCase()}/${
                              comp.slug
                            }`}
                            className="flex items-center gap-2"
                          >
                            View
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
