"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  locale: string;
  published: boolean;
  published_at: string | null;
};

type FormData = {
  title: string;
  content: string;
  slug: string;
  locale: string;
  excerpt: string;
  published: boolean;
};

const emptyForm: FormData = {
  title: "",
  content: "",
  slug: "",
  locale: "en",
  excerpt: "",
  published: false,
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, locale, published, published_at")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      published_at: form.published ? new Date().toISOString() : null,
    };
    if (editing) {
      await supabase.from("blog_posts").update(payload).eq("id", editing);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchPosts();
  }

  async function handleEdit(id: string) {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
    if (data) {
      setForm({
        title: data.title,
        content: data.content,
        slug: data.slug,
        locale: data.locale,
        excerpt: data.excerpt ?? "",
        published: data.published,
      });
      setEditing(id);
      setShowForm(true);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-white rounded-lg text-sm hover:bg-foreground/90 transition-colors"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-border rounded-xl p-6 mb-8 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              required
            />
            <input
              type="text"
              placeholder="Slug (url-friendly)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Excerpt (short summary)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
          />
          <textarea
            placeholder="Content (Markdown supported)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm font-mono focus:outline-none focus:border-foreground"
            required
          />
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.locale}
              onChange={(e) => setForm({ ...form, locale: e.target.value })}
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            >
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="ms">Malay</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
              />
              Published
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-foreground text-white rounded-lg text-sm hover:bg-foreground/90 transition-colors"
            >
              {editing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="px-6 py-2.5 border border-border rounded-lg text-sm hover:bg-surface transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-surface">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Title</th>
              <th className="text-left px-6 py-3 font-medium">Locale</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted">
                  No blog posts yet. Click &quot;New Post&quot; to create one.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-3">{post.title}</td>
                  <td className="px-6 py-3 text-muted">{post.locale}</td>
                  <td className="px-6 py-3">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-xs">
                        <Eye size={12} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted text-xs">
                        <EyeOff size={12} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="p-1.5 text-muted hover:text-foreground transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-muted hover:text-red-500 transition-colors ml-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
