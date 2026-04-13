"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onLogin();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-foreground text-white rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={() => {}} />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-foreground text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="text-lg font-semibold">
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-surface p-8 overflow-auto">{children}</main>
    </div>
  );
}
