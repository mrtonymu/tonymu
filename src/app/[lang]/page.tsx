import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { WhatsAppConnect } from "@/components/whatsapp-connect";
import { IGFeed } from "@/components/ig-feed";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Tony Mu — Property Advisor & Digital Builder",
    description:
      "Your no-pressure property advisor in Malaysia. Over 100 clients served. I also build websites and apps for businesses.",
  },
  zh: {
    title: "Tony Mu — 买房不着急，记得找托尼",
    description:
      "马来西亚房产顾问，已服务超过 100 位客户。不催签约，只帮你选对。也帮企业建网站和应用。",
  },
  ms: {
    title: "Tony Mu — Beli Rumah Jangan Gopoh, Cari Tony",
    description:
      "Penasihat hartanah di Malaysia yang takde pressure. Dah bantu 100+ pelanggan. Juga bina website dan app untuk bisnes.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = metaByLocale[lang] || metaByLocale.en;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero dict={dict} />
      <AnimateOnScroll>
        <About dict={dict} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Services dict={dict} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Portfolio dict={dict} lang={lang} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <IGFeed dict={dict} lang={lang} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <WhatsAppConnect dict={dict} lang={lang} />
      </AnimateOnScroll>
    </main>
  );
}
