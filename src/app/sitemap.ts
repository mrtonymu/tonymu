import type { MetadataRoute } from "next";

const baseUrl = "https://tonymu.com";
const locales = ["en", "zh", "ms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home page for each locale
  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  // Blog page for each locale
  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}
