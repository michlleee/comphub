import { FindMoreBtn } from "@/components/FindMoreBtn";
import { FloatingActionMenu } from "@/components/FloatingActionMenu";
import { ProfileSection } from "@/components/ProfileSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - CompHub",
  description:
    "Welcome to your CompHub dashboard. Track your saved competitions, stay updated on CS events, and manage your account.",
  openGraph: {
    title: "Dashboard - CompHub",
    description:
      "Welcome to your CompHub dashboard. Track your saved competitions, stay updated on CS events, and manage your account.",
    url: "http://localhost:3000/dashboard",
    siteName: "CompHub",
    images: [
      {
        url: "/code-icon-brackets.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard - CompHub",
    description:
      "Welcome to your CompHub dashboard. Track your saved competitions, stay updated on CS events, and manage your account.",
    images: ["/code-icon-brackets.png"],
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-8">
        <ProfileSection />
        <FindMoreBtn />
      </div>
      <FloatingActionMenu />
    </div>
  );
}
