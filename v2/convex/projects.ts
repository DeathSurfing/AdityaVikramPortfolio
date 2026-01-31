import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Project Queries
export const getProjects = query({
  args: {
    limit: v.optional(v.number()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let projectsQuery = ctx.db
      .query("projects")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc");

    if (args.category) {
      projectsQuery = ctx.db
        .query("projects")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .filter((q) => q.eq(q.field("isActive"), true))
        .order("asc");
    }

    const projects = await projectsQuery.take(args.limit ?? 50);
    return projects;
  },
});

export const getProjectById = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

// Testimonial Queries
export const getTestimonials = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const testimonials = await ctx.db
      .query("testimonials")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc")
      .take(args.limit ?? 50);
    return testimonials;
  },
});

// Admin Mutations for Projects
export const createProject = mutation({
  args: {
    displayId: v.number(),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    category: v.string(),
    technologies: v.array(v.string()),
    link: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      ...args,
      isActive: true,
    });
    return { projectId };
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    category: v.optional(v.string()),
    technologies: v.optional(v.array(v.string())),
    link: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { projectId, ...updates } = args;
    await ctx.db.patch(projectId, updates);
    return { success: true };
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
    return { success: true };
  },
});

// Admin Mutations for Testimonials
export const createTestimonial = mutation({
  args: {
    quote: v.string(),
    name: v.string(),
    designation: v.string(),
    src: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const testimonialId = await ctx.db.insert("testimonials", {
      ...args,
      isActive: true,
    });
    return { testimonialId };
  },
});

export const updateTestimonial = mutation({
  args: {
    testimonialId: v.id("testimonials"),
    quote: v.optional(v.string()),
    name: v.optional(v.string()),
    designation: v.optional(v.string()),
    src: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { testimonialId, ...updates } = args;
    await ctx.db.patch(testimonialId, updates);
    return { success: true };
  },
});

export const deleteTestimonial = mutation({
  args: {
    testimonialId: v.id("testimonials"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.testimonialId);
    return { success: true };
  },
});
