import CompData from "./CompData";

interface CompetitionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompetitionPage({
  params,
}: CompetitionPageProps) {
  const { slug } = await params;

  return <CompData slug={slug} />;
}
