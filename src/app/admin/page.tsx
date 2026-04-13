"use client";

import { useEffect, useState } from "react";
import { FolderOpen, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    portfolio: 0,
    blog: 0,
    testimonials: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      const [portfolio, blog, testimonials] = await Promise.all([
        supabase
          .from("portfolio_items")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("blog_posts")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("testimonials")
          .select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        portfolio: portfolio.count ?? 0,
        blog: blog.count ?? 0,
        testimonials: testimonials.count ?? 0,
      });
    }
    fetchCounts();
  }, []);

  const cards = [
    {
      href: "/admin/portfolio",
      label: "Portfolio Items",
      count: counts.portfolio,
      icon: FolderOpen,
    },
    {
      href: "/admin/blog",
      label: "Blog Posts",
      count: counts.blog,
      icon: FileText,
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials",
      count: counts.testimonials,
      icon: MessageSquare,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon size={24} className="text-muted" />
              <span className="text-3xl font-bold">{card.count}</span>
            </div>
            <p className="text-sm text-muted">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
