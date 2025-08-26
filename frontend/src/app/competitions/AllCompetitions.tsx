"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchModal from "@/components/SearchModal";
import api from "@/api/axios";
import { Search } from "lucide-react";

type Competition = {
  title: string;
  slug: string;
  category: string;
  description?: string;
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

      <div className="max-w-6xl mx-auto px-6 py-12">
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
              <Link
                key={comp.slug}
                href={`/competitions/${comp.category.toLowerCase()}/${
                  comp.slug
                }`}
                className="group"
              >
                <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-sm font-medium">
                      {comp.category}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-400 transition-colors">
                    {comp.title}
                  </h3>

                  {comp.description && (
                    <p className="text-slate-400 text-sm line-clamp-3 mb-4">
                      {comp.description}
                    </p>
                  )}

                  <div className="flex items-center text-teal-400 text-sm font-medium">
                    View Details
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
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
