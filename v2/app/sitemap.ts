import type { MetadataRoute } from "next"
import { getAllPosts, getLatestPostDate } from "@/lib/blog"
import { siteConfig } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  // Pages change when their content does, not when a build runs.
  const siteLastMod = getLatestPostDate()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteLastMod,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: siteLastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}
