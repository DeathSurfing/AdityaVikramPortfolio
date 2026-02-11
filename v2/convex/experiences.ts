import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Experience Queries
export const getExperiences = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const experiences = await ctx.db
      .query("experiences")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc")
      .take(args.limit ?? 50);
    return experiences;
  },
});

export const getExperienceById = query({
  args: {
    experienceId: v.id("experiences"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.experienceId);
  },
});

// Admin Mutations for Experiences
export const createExperience = mutation({
  args: {
    id: v.number(),
    title: v.string(),
    company: v.string(),
    location: v.string(),
    duration: v.string(),
    type: v.string(),
    description: v.string(),
    achievements: v.array(v.string()),
    technologies: v.array(v.string()),
    highlights: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        iconName: v.string(),
      })
    ),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const experienceId = await ctx.db.insert("experiences", {
      ...args,
      isActive: true,
    });
    return { experienceId };
  },
});

export const updateExperience = mutation({
  args: {
    experienceId: v.id("experiences"),
    title: v.optional(v.string()),
    company: v.optional(v.string()),
    location: v.optional(v.string()),
    duration: v.optional(v.string()),
    type: v.optional(v.string()),
    description: v.optional(v.string()),
    achievements: v.optional(v.array(v.string())),
    technologies: v.optional(v.array(v.string())),
    highlights: v.optional(
      v.array(
        v.object({
          title: v.string(),
          description: v.string(),
          iconName: v.string(),
        })
      )
    ),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { experienceId, ...updates } = args;
    await ctx.db.patch(experienceId, updates);
    return { success: true };
  },
});

export const deleteExperience = mutation({
  args: {
    experienceId: v.id("experiences"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.experienceId);
    return { success: true };
  },
});
