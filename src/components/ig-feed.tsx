"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Camera, Play } from "lucide-react";
import { type Dictionary } from "@/app/[lang]/dictionaries";

const IG_HANDLE = "mrtonyyam";
const BEHOLD_FEED_URL = process.env.NEXT_PUBLIC_BEHOLD_FEED_URL;

interface BeholdPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  prunedCaption?: string;
  timestamp: string;
  sizes?: {
    small?: { mediaUrl: string };
    medium?: { mediaUrl: string };
    large?: { mediaUrl: string };
    full?: { mediaUrl: string };
  };
}

const sectionText: Record<string, { title: string; subtitle: string; follow: string }> = {
  en: {
    title: "Life & Work",
    subtitle: "What I've been up to lately.",
    follow: `Follow @${IG_HANDLE}`,
  },
  zh: {
    title: "生活与工作",
    subtitle: "最近在忙什么。",
    follow: `关注 @${IG_HANDLE}`,
  },
  ms: {
    title: "Kehidupan & Kerja",
    subtitle: "Apa yang saya buat kebelakangan ini.",
    follow: `Follow @${IG_HANDLE}`,
  },
};

function PostCard({ post }: { post: BeholdPost }) {
  const imgSrc =
    post.mediaType === "VIDEO"
      ? post.sizes?.medium?.mediaUrl || post.thumbnailUrl || post.mediaUrl
      : post.sizes?.medium?.mediaUrl || post.mediaUrl;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-60 md:w-68 snap-start"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-card group">
        <img
          src={imgSrc}
          alt={post.prunedCaption || post.caption || "Instagram post"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {post.mediaType === "VIDEO" && (
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-foreground p-1.5 rounded-full">
            <Play size={12} fill="currentColor" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <p className="text-white text-xs p-4 line-clamp-2">
            {post.prunedCaption || post.caption}
          </p>
        </div>
      </div>
    </a>
  );
}

export function IGFeed({ dict, lang }: { dict: Dictionary; lang: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const text = sectionText[lang] || sectionText.en;
  const [posts, setPosts] = useState<BeholdPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!BEHOLD_FEED_URL) return;
    fetch(BEHOLD_FEED_URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data?.posts?.slice(0, 12) || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Infinite scroll: when reaching the end of one set, jump back seamlessly
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || posts.length === 0) return;

    const scrollWidth = el.scrollWidth;
    const halfScroll = scrollWidth / 3;

    // If scrolled past the 2nd set, jump back to the 1st set
    if (el.scrollLeft >= halfScroll * 2) {
      el.scrollLeft -= halfScroll;
    }
    // If scrolled before the 1st set, jump forward to the 2nd set
    if (el.scrollLeft <= 0) {
      el.scrollLeft += halfScroll;
    }
  }, [posts.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || posts.length === 0) return;

    el.addEventListener("scroll", handleScroll);

    // Start at the 2nd set so user can scroll both directions
    const halfScroll = el.scrollWidth / 3;
    el.scrollLeft = halfScroll;

    return () => el.removeEventListener("scroll", handleScroll);
  }, [posts, handleScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!BEHOLD_FEED_URL || (!loading && posts.length === 0)) return null;

  // Render 3 copies for seamless infinite loop
  const renderPosts = posts.length > 0 ? [...posts, ...posts, ...posts] : [];

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {text.title}
            </h2>
            <p className="text-muted">{text.subtitle}</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-border hover:border-foreground transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-border hover:border-foreground transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shrink-0 w-60 md:w-68 snap-start">
                  <div className="aspect-square rounded-2xl bg-card shadow-sm animate-pulse" />
                </div>
              ))
            : renderPosts.map((post, i) => (
                <PostCard key={`${post.id}-${i}`} post={post} />
              ))}
        </div>
      </div>
    </section>
  );
}
