"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { type Dictionary } from "@/app/[lang]/dictionaries";

// Placeholder data — will be replaced by Supabase data later
const testimonialItems = [
  {
    id: 1,
    client_name: "Sarah L.",
    client_title: "Property Buyer",
    quote:
      "Tony made the entire property buying process seamless. His market knowledge and dedication to finding the right unit was exceptional.",
  },
  {
    id: 2,
    client_name: "James T.",
    client_title: "Startup Founder",
    quote:
      "Working with Tony on our web platform was a great experience. He delivered a clean, performant product that exceeded our expectations.",
  },
  {
    id: 3,
    client_name: "Ahmad R.",
    client_title: "Business Owner",
    quote:
      "Tony's tech consulting helped us identify the right solutions and save significant costs. His strategic approach is invaluable.",
  },
];

export function Testimonials({ dict }: { dict: Dictionary }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonialItems.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonialItems.length - 1 ? 0 : c + 1));

  const item = testimonialItems[current];

  return (
    <section id="testimonials" className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {dict.testimonials.title}
          </h2>
          <p className="text-muted">{dict.testimonials.subtitle}</p>
        </div>

        <div className="relative">
          <div className="text-center px-8 md:px-16">
            <Quote size={32} className="text-border mx-auto mb-8" />
            <blockquote className="text-lg md:text-xl leading-relaxed mb-8">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold">{item.client_name}</p>
              <p className="text-sm text-muted">{item.client_title}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:border-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonialItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-foreground" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:border-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
