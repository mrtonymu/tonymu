"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

type WhatsAppSettings = {
  number: string;
  messages: { en: string; zh: string; ms: string };
};

type PersonalInfo = {
  name: string;
  tagline: { en: string; zh: string; ms: string };
  photo_url: string;
};

export default function AdminSettings() {
  const [whatsapp, setWhatsapp] = useState<WhatsAppSettings>({
    number: "",
    messages: { en: "", zh: "", ms: "" },
  });
  const [personal, setPersonal] = useState<PersonalInfo>({
    name: "",
    tagline: { en: "", zh: "", ms: "" },
    photo_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase
      .from("site_settings")
      .select("key, value");
    if (data) {
      for (const row of data) {
        if (row.key === "whatsapp") setWhatsapp(row.value as WhatsAppSettings);
        if (row.key === "personal_info")
          setPersonal(row.value as PersonalInfo);
      }
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    await Promise.all([
      supabase
        .from("site_settings")
        .upsert({ key: "whatsapp", value: whatsapp, updated_at: new Date().toISOString() }),
      supabase
        .from("site_settings")
        .upsert({ key: "personal_info", value: personal, updated_at: new Date().toISOString() }),
    ]);

    setSaving(false);
    setMessage("Settings saved!");
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-white rounded-lg text-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {message && (
        <div className="mb-6 px-4 py-2.5 bg-green-50 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}

      {/* Personal Info */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted mb-1 block">Name</label>
            <input
              type="text"
              value={personal.name}
              onChange={(e) =>
                setPersonal({ ...personal, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1 block">
              Photo URL
            </label>
            <input
              type="text"
              value={personal.photo_url}
              onChange={(e) =>
                setPersonal({ ...personal, photo_url: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              placeholder="https://..."
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted mb-1 block">
                Tagline (EN)
              </label>
              <input
                type="text"
                value={personal.tagline.en}
                onChange={(e) =>
                  setPersonal({
                    ...personal,
                    tagline: { ...personal.tagline, en: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">
                Tagline (ZH)
              </label>
              <input
                type="text"
                value={personal.tagline.zh}
                onChange={(e) =>
                  setPersonal({
                    ...personal,
                    tagline: { ...personal.tagline, zh: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">
                Tagline (BM)
              </label>
              <input
                type="text"
                value={personal.tagline.ms}
                onChange={(e) =>
                  setPersonal({
                    ...personal,
                    tagline: { ...personal.tagline, ms: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Settings */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">WhatsApp Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted mb-1 block">
              Phone Number (with country code, no +)
            </label>
            <input
              type="text"
              value={whatsapp.number}
              onChange={(e) =>
                setWhatsapp({ ...whatsapp, number: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
              placeholder="60123456789"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1 block">
              Pre-filled Message (EN)
            </label>
            <textarea
              value={whatsapp.messages.en}
              onChange={(e) =>
                setWhatsapp({
                  ...whatsapp,
                  messages: { ...whatsapp.messages, en: e.target.value },
                })
              }
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1 block">
              Pre-filled Message (ZH)
            </label>
            <textarea
              value={whatsapp.messages.zh}
              onChange={(e) =>
                setWhatsapp({
                  ...whatsapp,
                  messages: { ...whatsapp.messages, zh: e.target.value },
                })
              }
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1 block">
              Pre-filled Message (BM)
            </label>
            <textarea
              value={whatsapp.messages.ms}
              onChange={(e) =>
                setWhatsapp({
                  ...whatsapp,
                  messages: { ...whatsapp.messages, ms: e.target.value },
                })
              }
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
