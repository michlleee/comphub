"use client";
import { useState, useEffect } from "react";
import api from "@/api/axios";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import type { Competition } from "@/app/competitions/AllCompetitions";
import CompetitionCard from "./CompetitionCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!search) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const { data } = await api.get(
          `${backendURL}/api/competition/search?query=${search}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setResults(data.competitionList.slice(0, 5));
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-start pt-20 z-50 px-4">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <Search className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Search Competitions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, category, or description..."
              className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
            </div>
          ) : search && results.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="text-slate-400 text-lg mb-2">
                No results found
              </div>
              <div className="text-slate-500 text-sm">
                Try searching with different keywords
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="px-6 pb-6">
              <div className="space-y-3">
                {results.map((comp) => (
                  <CompetitionCard key={comp.slug} competition={comp} />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <Link
                  href={`/competitions/search?query=${encodeURIComponent(
                    search
                  )}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 font-medium rounded-xl transition-colors"
                >
                  See all results
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
