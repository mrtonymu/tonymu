import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";

// Placeholder data — will be replaced by Supabase data later
const blogPosts = [
  {
    slug: "property-market-2026",
    title: "Malaysia Property Market Outlook 2026",
    excerpt:
      "An in-depth analysis of the Malaysian property market trends and what buyers should watch for this year.",
    date: "2026-03-15",
    category: "Property",
  },
  {
    slug: "nextjs-portfolio",
    title: "Building a Modern Portfolio with Next.js",
    excerpt:
      "A walkthrough of how I built this portfolio website using Next.js, Tailwind CSS, and Supabase.",
    date: "2026-02-20",
    category: "Tech",
  },
  {
    slug: "first-property-guide",
    title: "First-Time Buyer's Guide to Malaysian Property",
    excerpt:
      "Everything you need to know before purchasing your first property in Malaysia.",
    date: "2026-01-10",
    category: "Property",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {dict.blog.title}
        </h1>
        <p className="text-muted mb-12">{dict.blog.subtitle}</p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group block border-b border-border pb-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted mb-2">
                    {post.date} &middot; {post.category}
                  </p>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-muted transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted">{post.excerpt}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted group-hover:text-foreground transition-colors mt-1 shrink-0"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
