"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

export function FindMoreBtn() {
  return (
    <div className="mt-8">
      <Link href="/competitions" className="block">
        <Button
          size="lg"
          className="w-full bg-gray-900 text-white border-0 h-14 text-lg font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors duration-200"
        >
          <Search className="mr-3 h-5 w-5" />
          Explore More Competitions
          <ArrowRight className="ml-3 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
