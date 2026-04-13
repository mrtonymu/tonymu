"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Testimonial = {
  id: string;
  client_name: string;
  client_title: string | null;
  quote: string;
  locale: string;
  sort_order: number;
};

type FormData = {
  client_name: string;
  client_title: string;
  quote: string;
  locale: string;
  featured: boolean;
  sort_order: number;
};

const emptyForm: FormData = {
  client_name: "",
  client_title: "",
  quote: "",
  locale: "en",
  featured: false,
  sort_order: 0,
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase
      .from("testimonials")
      .select("id, client_name, client_title, quote, locale, sort_order")
      .order("sort_order");
    setItems(data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing);
    } else {
      await supabase.from("testimonials").insert(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchItems();
  }

  async function handleEdit(id: string) {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .single();
    if (data) {
      setForm({
        client_name: data.client_name,
        client_title: data.client_title ?? "",
        quote: data.quote,
        locale: data.locale,
        featured: data.featured,
        sort_order: data.sort_order,
      });
      setEditing(id);
      setShowForm(true);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchItems();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-white rounded-lg text-sm hover:bg-foreground/90 transition-colors"
        >
          <Plus size={16} />
          Add Testimonial
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
              placeholder="Client name"
              value={form.client_name}
              onChange={(e) =>
                setForm({ ...form, client_name: e.target.value })
              }
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              required
            />
            <input
              type="text"
              placeholder="Client title (e.g. Property Buyer)"
              value={form.client_title}
              onChange={(e) =>
                setForm({ ...form, client_title: e.target.value })
              }
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <textarea
            placeholder="Quote"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            required
          />
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={form.locale}
              onChange={(e) => setForm({ ...form, locale: e.target.value })}
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            >
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="ms">Malay</option>
            </select>
            <input
              type="number"
              placeholder="Sort order"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
              }
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured
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
              <th className="text-left px-6 py-3 font-medium">Client</th>
              <th className="text-left px-6 py-3 font-medium">Quote</th>
              <th className="text-left px-6 py-3 font-medium">Locale</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted">
                  No testimonials yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-3">
                    <p className="font-medium">{item.client_name}</p>
                    <p className="text-xs text-muted">{item.client_title}</p>
                  </td>
                  <td className="px-6 py-3 text-muted max-w-xs truncate">
                    {item.quote}
                  </td>
                  <td className="px-6 py-3 text-muted">{item.locale}</td>
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
