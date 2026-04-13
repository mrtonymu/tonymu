import { Globe, Link2, Mail } from "lucide-react";
import { type Dictionary } from "@/app/[lang]/dictionaries";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Tony Mu. {dict.footer.rights}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/mrtonymu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Globe size={18} />
          </a>
          <a
            href="#"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Link2 size={18} />
          </a>
          <a
            href="mailto:hello@tonymu.com"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
