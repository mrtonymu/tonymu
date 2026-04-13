"use client";

import { QRCodeSVG } from "qrcode.react";
import { MessageCircle } from "lucide-react";
import { type Dictionary } from "@/app/[lang]/dictionaries";

// Default WhatsApp config — will be editable from admin later
const WHATSAPP_NUMBER = "601123831228";
const WHATSAPP_MESSAGES: Record<string, string> = {
  en: "Hi Tony! I'm interested in finding out more about a property.",
  zh: "你好 Tony！我对看房有兴趣，想了解更多。",
  ms: "Hi Tony! Saya berminat nak tahu lebih lanjut pasal hartanah.",
};

function getWhatsAppUrl(lang: string) {
  const message = WHATSAPP_MESSAGES[lang] || WHATSAPP_MESSAGES.en;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppConnect({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const currentLang = lang || "en";
  const whatsappUrl = getWhatsAppUrl(currentLang);

  return (
    <section
      id="contact"
      className="py-24 px-6 min-h-[80vh] flex items-center"
    >
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {dict.whatsapp.title}
        </h2>
        <p className="text-muted mb-10">{dict.whatsapp.subtitle}</p>

        {/* QR Code */}
        <div className="bg-card p-8 rounded-2xl border border-border inline-block mb-8">
          <QRCodeSVG
            value={whatsappUrl}
            size={250}
            level="M"
            bgColor="#fffefa"
            fgColor="#2c2926"
          />
        </div>

        <p className="text-sm text-muted mb-4">{dict.whatsapp.or}</p>

        {/* Fallback button for same-device viewing */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white rounded-full text-sm font-medium hover:bg-[#20BD5A] transition-colors"
        >
          <MessageCircle size={18} />
          {dict.whatsapp.button}
        </a>
      </div>
    </section>
  );
}
