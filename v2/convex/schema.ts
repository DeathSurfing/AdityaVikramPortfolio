import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submissions: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    ipAddress: v.string(),
    timestamp: v.number(),
    read: v.boolean(),
  })
    .index("by_ip", ["ipAddress"])
    .index("by_timestamp", ["timestamp"])
    .index("by_ip_and_timestamp", ["ipAddress", "timestamp"]),

  projects: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.string(),
    category: v.string(),
    technologies: v.array(v.string()),
    link: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_active", ["isActive"])
    .index("by_createdAt", ["createdAt"]),

  testimonials: defineTable({
    quote: v.string(),
    name: v.string(),
    designation: v.string(),
    src: v.string(),
    order: v.number(),
    isActive: v.boolean(),
  })
    .index("by_order", ["order"])
    .index("by_active", ["isActive"]),

  experiences: defineTable({
    id: v.number(),
    title: v.string(),
    company: v.string(),
    location: v.string(),
    duration: v.string(),
    type: v.string(),
    description: v.string(),
    achievements: v.array(v.string()),
    technologies: v.array(v.string()),
    highlights: v.array(v.object({
      title: v.string(),
      description: v.string(),
      iconName: v.string(),
    })),
    isActive: v.boolean(),
    order: v.number(),
  })
    .index("by_active", ["isActive"])
    .index("by_order", ["order"]),
});
