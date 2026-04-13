import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getDictionary, hasLocale } from "../../dictionaries";

// Placeholder data — will be replaced by Supabase data later
const portfolioItems: Record<
  string,
  {
    title: string;
    category: "property" | "tech";
    description: string;
    link?: string;
  }
> = {
  "property-launch-1": {
    title: "Premium Residences KL",
    category: "property",
    description:
      "Assisted 20+ clients in securing units at this premium residential development in Kuala Lumpur. Provided end-to-end advisory including market analysis, unit selection, and financing guidance. The project features luxury amenities, strategic location near KLCC, and strong rental yield potential.",
  },
  "cold-call-tracker": {
    title: "Cold Call Tracker",
    category: "tech",
    description:
      "A full-stack analytics platform built with Next.js, TypeScript, and Supabase for tracking cold call performance. Features include daily/weekly/monthly statistics, visual charts with Recharts, and mobile-responsive design for on-the-go tracking.",
    link: "https://github.com/mrtonymu/coldcalltracker",
  },
  "property-launch-2": {
    title: "Lakeside Villas",
    category: "property",
    description:
      "Managed property advisory for a lakeside villa development in Selangor. Helped clients navigate the purchasing process including SPA review, loan applications, and unit handover. Achieved 100% client satisfaction with personalized advisory service.",
  },
  "business-website": {
    title: "Corporate Website",
    category: "tech",
    description:
      "Designed and developed a responsive corporate website for a Malaysian SME. Built with modern web technologies, featuring multi-language support, contact form integration, and SEO optimization. Delivered a professional online presence that increased client inquiries by 40%.",
  },
};

const categoryLabel = {
  property: "Property",
  tech: "Tech",
};

export default async function PortfolioDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const item = portfolioItems[slug];

  if (!item) notFound();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${lang}#portfolio`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {dict.portfolio.title}
        </Link>

        <p className="text-xs text-muted mb-4">
          {categoryLabel[item.category]}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          {item.title}
        </h1>

        {/* Project image placeholder */}
        <div className="aspect-[16/9] bg-surface rounded-2xl border border-border flex items-center justify-center mb-10">
          <span className="text-muted text-sm">{item.title} Preview</span>
        </div>

        <div className="max-w-3xl">
          <p className="text-muted leading-relaxed mb-8">{item.description}</p>

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-full text-sm hover:border-foreground transition-colors"
            >
              {dict.portfolio.viewProject}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
