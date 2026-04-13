"use client";

import { useState, useEffect } from "react";
import { type Dictionary } from "@/app/[lang]/dictionaries";

const photos = [
  { src: "/images/about-work.jpg", alt: "Tony showing a client around a property showroom" },
  { src: "/images/about-client.jpg", alt: "Tony consulting with a client" },
  { src: "/images/about-team.jpg", alt: "Tony with his team" },
];

export function About({ dict }: { dict: Dictionary }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "100+", label: dict.about.stats.clients },
    { value: "5+", label: dict.about.stats.projects },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo carousel */}
          <div className="relative rounded-2xl overflow-hidden border border-border bg-surface">
            {photos.map((photo, i) => (
              <div
                key={i}
                className={`transition-opacity duration-700 ease-in-out ${
                  i === current
                    ? "relative opacity-100"
                    : "absolute inset-0 opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full block ${i === current ? "h-auto" : "h-full object-cover"}`}
                />
              </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-foreground" : "bg-foreground/30"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {dict.about.title}
            </h2>
            <div className="text-muted leading-relaxed mb-10 space-y-4">
              {dict.about.description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
