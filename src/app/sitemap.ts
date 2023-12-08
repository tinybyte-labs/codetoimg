import type { MetadataRoute } from "next";
import { BASE_URL } from "@/constants";

const addPathToBaseURL = (path: string) => `${BASE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    // "/blog",
    // "/about",
    // "/pricing",
    // "/legal/privacy",
    // "/legal/terms",
    "/editor",
  ].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: new Date(),
  }));

  return [...pages];
}
