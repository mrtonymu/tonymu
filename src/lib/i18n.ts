export const locales = ["en", "zh", "ms"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ms: "BM",
};
