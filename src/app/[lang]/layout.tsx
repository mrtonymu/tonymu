import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import { getDictionary, hasLocale } from "./dictionaries";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as (typeof locales)[number])) {
    notFound();
  }

  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar dict={dict} lang={lang} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  );
}
