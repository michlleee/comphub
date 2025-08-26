"use client";

import { useState, useEffect } from "react";
import SearchModal from "@/components/SearchModal";
import CompetitionCard from "@/components/CompetitionCard";
import api from "@/api/axios";
import { Search } from "lucide-react";

export type Competition = {
  title: string;
  topic: string;
  slug: string;
  category: string;
  shortDesc?: string;
  location: string;
  registrationOpen: Date;
  registrationClose: Date;
};

export default function AllCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function getAllCompetitions() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await api.get(`${backendURL}/api/competition/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCompetitions(data.competitionList);
    } catch (error) {
      console.error("Failed to fetch all competition:", error);
      setCompetitions([]);
    }
  }

  useEffect(() => {
    getAllCompetitions();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Competitions</h1>
          <p className="text-slate-300 text-lg mb-8">
            Find and participate in exciting competitions worldwide
          </p>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Search size={20} />
            Search Competitions
          </button>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">All Competitions</h2>
          <p className="text-slate-400">
            Browse through all available competitions
          </p>
        </div>

        {competitions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No competitions found</div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((comp: Competition) => (
              <CompetitionCard key={comp.slug} competition={comp} />
            ))}
          </div>
        )}
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
