import CompData from "./CompData";
import type { Metadata } from "next";

interface DetailsPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: DetailsPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const formattedTitle = formatSlug(slug);
  return {
    title: `${formattedTitle} - CompHub`,
    description: `Details for competition ${formattedTitle}. Stay updated and track your registrations.`,
    openGraph: {
      title: `${formattedTitle} - CompHub`,
      description: `Details for competition ${formattedTitle}. Stay updated and track your registrations.`,
      url: `http://localhost:3000/competitions/${category}/${slug}`,
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
      title: `${formattedTitle} - CompHub`,
      description: `Details for competition ${formattedTitle}. Stay updated and track your registrations.`,
      images: ["/code-icon-brackets.png"],
    },
  };
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { category, slug } = await params;
  return <CompData slug={slug} />;
}
