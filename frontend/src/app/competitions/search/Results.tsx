"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/api/axios";
import { Search, ArrowLeft } from "lucide-react";

type Competition = {
  title: string;
  slug: string;
  category: string;
  description?: string;
};

export default function Results() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const { data } = await api.get(
          `${backendURL}/api/competition/search?query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setResults(data.competitionList || []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to competitions
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-teal-500/10 rounded-xl">
              <Search className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Search Results</h1>
              <p className="text-slate-300">
                Results for:{" "}
                <span className="text-teal-400 font-semibold">"{query}"</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mb-4"></div>
            <p className="text-slate-400">Searching competitions...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <div className="p-4 bg-slate-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              No competitions found
            </h2>
            <p className="text-slate-400 mb-8">
              We couldn't find any competitions matching "{query}". Try
              searching with different keywords.
            </p>
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-colors"
            >
              Browse all competitions
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-slate-400">
                Found{" "}
                <span className="text-teal-400 font-semibold">
                  {results.length}
                </span>{" "}
                competition
                {results.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="space-y-6">
              {results.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/competitions/${comp.category}/${comp.slug}`}
                  className="group block"
                >
                  <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500 rounded-2xl p-8 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-teal-500/10 text-teal-400 px-4 py-2 rounded-full text-sm font-medium">
                        {comp.category}
                      </div>
                      <div className="text-slate-400 group-hover:text-teal-400 transition-colors">
                        <svg
                          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
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

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-400 transition-colors">
                      {comp.title}
                    </h3>

                    {comp.description && (
                      <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        {comp.description}
                      </p>
                    )}

                    <div className="flex items-center text-teal-400 font-medium">
                      View Competition Details
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
          </>
        )}
      </div>
    </div>
  );
}
