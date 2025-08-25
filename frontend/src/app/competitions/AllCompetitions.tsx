"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/api/axios";

type Competition = {
  title: string;
  slug: string;
  category: string;
  description?: string;
};

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [search, setSearch] = useState("");
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

  const filtered = competitions.filter((comp: Competition) =>
    comp.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>All Competitions</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4"
      />
      <ul>
        {filtered.map((comp: Competition) => (
          <li key={comp.slug}>
            <Link href={`/competitions/${comp.category}/${comp.slug}`}>
              {comp.title} ({comp.category})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
