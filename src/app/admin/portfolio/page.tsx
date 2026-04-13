"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  locale: string;
  category: string;
  featured: boolean;
  sort_order: number;
};

type FormData = {
  title: string;
  description: string;
  slug: string;
  locale: string;
  category: string;
  link: string;
  featured: boolean;
  sort_order: number;
};

const emptyForm: FormData = {
  title: "",
  description: "",
  slug: "",
  locale: "en",
  category: "property",
  link: "",
  featured: false,
  sort_order: 0,
};

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase
      .from("portfolio_items")
      .select("id, title, slug, locale, category, featured, sort_order")
      .order("sort_order");
    setItems(data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await supabase.from("portfolio_items").update(form).eq("id", editing);
    } else {
      await supabase.from("portfolio_items").insert(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchItems();
  }

  async function handleEdit(id: string) {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("id", id)
      .single();
    if (data) {
      setForm({
        title: data.title,
        description: data.description ?? "",
        slug: data.slug,
        locale: data.locale,
        category: data.category ?? "property",
        link: data.link ?? "",
        featured: data.featured,
        sort_order: data.sort_order,
      });
      setEditing(id);
      setShowForm(true);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await supabase.from("portfolio_items").delete().eq("id", id);
    fetchItems();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-white rounded-lg text-sm hover:bg-foreground/90 transition-colors"
        >
          <Plus size={16} />
          Add Item
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
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
          />
          <div className="grid md:grid-cols-4 gap-4">
            <select
              value={form.locale}
              onChange={(e) => setForm({ ...form, locale: e.target.value })}
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            >
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="ms">Malay</option>
            </select>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            >
              <option value="property">Property</option>
              <option value="tech">Tech</option>
            </select>
            <input
              type="text"
              placeholder="External link (optional)"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
            <input
              type="number"
              placeholder="Sort order"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
              }
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured
          </label>
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
              <th className="text-left px-6 py-3 font-medium">Slug</th>
              <th className="text-left px-6 py-3 font-medium">Locale</th>
              <th className="text-left px-6 py-3 font-medium">Category</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted">
                  No portfolio items yet. Click &quot;Add Item&quot; to create
                  one.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-3">{item.title}</td>
                  <td className="px-6 py-3 text-muted">{item.slug}</td>
                  <td className="px-6 py-3 text-muted">{item.locale}</td>
                  <td className="px-6 py-3 text-muted">{item.category}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-1.5 text-muted hover:text-foreground transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
