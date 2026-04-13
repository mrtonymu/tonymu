import { ArrowDown } from "lucide-react";
import { type Dictionary } from "@/app/[lang]/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          {dict.hero.name}
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-3">
          {dict.hero.slogan}
        </p>
        <p className="text-base md:text-lg text-muted mb-12">
          {dict.hero.tagline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-light transition-colors"
          >
            {dict.hero.cta}
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-full text-sm text-muted hover:text-foreground hover:border-foreground transition-colors"
          >
            {dict.hero.secondaryCta}
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
