"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/api/axios";

interface Competition {
  slug: string;
  title: string;
  category: string;
  description?: string;
}

export default function CategoryCard() {
  const { category } = useParams() as { category: string };
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchComps = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const { data } = await api.get(`${backendURL}/api/competition/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const filtered = data.competitionList.filter(
          (c: Competition) =>
            c.category?.trim().toLowerCase() === category.trim().toLowerCase()
        );
        setCompetitions(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    if (category) fetchComps();
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {category.toUpperCase()} Competitions
      </h1>
      {competitions.length === 0 ? (
        <p>No competitions found in this category.</p>
      ) : (
        <ul className="space-y-2">
          {competitions.map((comp) => (
            <li key={comp.slug}>
              <Link
                href={`/competitions/${category}/${comp.slug}`}
                className="text-blue-600 hover:underline"
              >
                {comp.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
