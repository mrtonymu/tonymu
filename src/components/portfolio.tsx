import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type Dictionary } from "@/app/[lang]/dictionaries";

// Placeholder data — will be replaced by Supabase data later
const portfolioItems = [
  {
    slug: "property-launch-1",
    title: "Premium Residences KL",
    category: "property" as const,
    image: null,
  },
  {
    slug: "cold-call-tracker",
    title: "Cold Call Tracker",
    category: "tech" as const,
    image: null,
  },
  {
    slug: "property-launch-2",
    title: "Lakeside Villas",
    category: "property" as const,
    image: null,
  },
  {
    slug: "business-website",
    title: "Corporate Website",
    category: "tech" as const,
    image: null,
  },
];

const categoryLabel = {
  property: "Property",
  tech: "Tech",
};

export function Portfolio({ dict, lang }: { dict: Dictionary; lang: string }) {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {dict.portfolio.title}
            </h2>
            <p className="text-muted">{dict.portfolio.subtitle}</p>
          </div>
          <Link
            href={`/${lang}/portfolio`}
            className="hidden md:inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
          >
            {dict.portfolio.viewAll}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${lang}/portfolio/${item.slug}`}
              className="group block"
            >
              <div className="aspect-[16/10] bg-surface rounded-2xl border border-border overflow-hidden mb-4 flex items-center justify-center group-hover:border-foreground/20 transition-colors">
                <span className="text-muted text-sm">
                  {item.title} Preview
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold group-hover:text-foreground transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    {categoryLabel[item.category]}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted group-hover:text-foreground transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
