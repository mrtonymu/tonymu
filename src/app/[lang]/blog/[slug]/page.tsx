import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary, hasLocale } from "../../dictionaries";

// Placeholder data — will be replaced by Supabase data later
const blogPosts: Record<
  string,
  { title: string; date: string; category: string; content: string }
> = {
  "property-market-2026": {
    title: "Malaysia Property Market Outlook 2026",
    date: "2026-03-15",
    category: "Property",
    content: `The Malaysian property market continues to show resilience and growth in 2026. Key highlights include:

**Market Trends**
- Sustained demand in the Klang Valley with new infrastructure projects driving growth
- Penang and Johor Bahru emerging as attractive alternatives for investors
- Green building certifications becoming increasingly important for buyers

**What Buyers Should Watch**
- Interest rate movements and their impact on mortgage affordability
- Government incentives for first-time buyers
- New township developments along the MRT 3 corridor

**Investment Opportunities**
- Transit-oriented developments continue to outperform the market
- Mixed-use developments offering both residential and commercial value
- Digital nomad-friendly properties gaining traction

The market remains favorable for long-term investors who do their due diligence and work with experienced advisors.`,
  },
  "nextjs-portfolio": {
    title: "Building a Modern Portfolio with Next.js",
    date: "2026-02-20",
    category: "Tech",
    content: `In this article, I walk through the technical decisions behind building this portfolio website.

**Tech Stack**
- Next.js 16 with App Router for server-side rendering and static generation
- Tailwind CSS v4 for utility-first styling
- Supabase for database, auth, and file storage
- Deployed on Vercel for optimal performance

**Key Features**
- Internationalization supporting English, Chinese, and Malay
- WhatsApp QR code integration for client communication
- CMS admin panel for managing all content
- Mobile-first responsive design

**Lessons Learned**
- Server Components significantly reduce client-side JavaScript
- Static generation with generateStaticParams provides excellent performance
- Supabase's Row Level Security simplifies auth patterns

The combination of these technologies provides a fast, maintainable, and professional web presence.`,
  },
  "first-property-guide": {
    title: "First-Time Buyer's Guide to Malaysian Property",
    date: "2026-01-10",
    category: "Property",
    content: `Buying your first property in Malaysia is an exciting milestone. Here's everything you need to know.

**Understanding the Process**
1. Determine your budget and get pre-approved for a loan
2. Research locations and property types that fit your needs
3. Visit showrooms and compare options
4. Engage a lawyer for the Sale and Purchase Agreement
5. Apply for your housing loan
6. Complete the purchase and collect your keys

**Key Considerations**
- Location: proximity to work, schools, and amenities
- Developer reputation and track record
- Future development plans in the area
- Maintenance fees and sinking fund contributions

**Financial Planning**
- Down payment: typically 10% of purchase price
- Legal fees: approximately 1-2% of property value
- Stamp duty: varies based on property price
- Moving and renovation costs

**Government Schemes**
- My First Home Scheme for buyers under RM500,000
- Various state-level incentives and rebates
- Housing Development Account (HDA) protection for off-plan purchases

Working with an experienced property advisor can help navigate these complexities and secure the best deal.`,
  },
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const post = blogPosts[slug];

  if (!post) notFound();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {dict.blog.backToList}
        </Link>

        <p className="text-xs text-muted mb-4">
          {post.date} &middot; {post.category}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          {post.title}
        </h1>

        <div className="prose prose-neutral max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h3 key={i} className="text-lg font-semibold mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 text-muted">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j}>{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d\. /)) {
              return (
                <ol key={i} className="list-decimal pl-6 space-y-2 text-muted">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j}>{item.replace(/^\d+\. /, "")}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={i} className="text-muted leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>
    </main>
  );
}
